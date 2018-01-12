//
// content.js
//

'use strict';

Object.defineProperty(Node.prototype, 'getImages', {
    value: function(x, y) {
        const elements = this.elementsFromPoint(x, y).filter(
            node => node instanceof Element
        );

        return elements.reduce((acc, element) => {
            let images = [
                element.getBackgroundImage(),
                element.getBackgroundImage('::before'),
                element.getBackgroundImage('::after'),
                element.getNormalImage()
            ];

            if (element.shadowRoot) {
                images = images.concat(element.shadowRoot.getImages(x, y));
            }

            return acc.concat(images);
        }, []);
    }
});

Object.defineProperties(Element.prototype, {
    getBackgroundImage: {
        value: function(pseudo) {
            const style = getComputedStyle(this, pseudo);
            const value = style.getPropertyValue('background-image');
            if (value !== 'none' && value.match(/url\("?(.+?)"?\)/)) {
                return RegExp.$1;
            }
        }
    },
    getNormalImage: {
        value: function() {
            if (this.tagName === 'IMG') return this.src;
        }
    }
});

const IDENTIFIER = 'view-background-image:';

document.addEventListener('contextmenu', e => {
    const images = document.getImages(e.clientX, e.clientY);

    const message = images.filter((value, index, array) =>
        value && array.indexOf(value) === index
    ).join(' ');

    window.top.postMessage(IDENTIFIER + message, '*');
});

if (window.self === window.top) {
    let images;
    window.addEventListener('message', e => {
        if (e.data.indexOf && e.data.indexOf(IDENTIFIER) === 0) {
            images = e.data.slice(IDENTIFIER.length);
        }
    });
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        sendResponse(images);
    });
}

