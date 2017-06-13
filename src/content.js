//
// content.js
//

'use strict';

Object.defineProperty(Node.prototype, 'getImages', {
    value: function(x, y) {
        const elements = this.elementsFromPoint(x, y)
            .filter(node => node instanceof Element);
        return elements.reduce((images, element) => {
            const image = element.getBackgroundImage()
                        || element.getNormalImage();
            if (image) images.push(image);
            if (element.shadowRoot) {
                images = images.concat(element.shadowRoot.getImages(x, y));
            }
            return images;
        }, []);
    }
});

Object.defineProperties(Element.prototype, {
    getBackgroundImage: {
        value: function() {
            const style = getComputedStyle(this);
            const bgimage = style.getPropertyValue('background-image');
            if (bgimage !== 'none' && bgimage.match(/url\("?(.+?)"?\)/)) {
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
    const message = document.getImages(e.clientX, e.clientY).join(' ');
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

