//
// content.js
//

'use strict';

Object.defineProperty(Node.prototype, 'getBackgroundImages', {
    value: function(x, y) {
        const elements = this.elementsFromPoint(x, y).filter(
            element => element instanceof Element
        );

        const images = elements.reduce((acc, element) => {
            const array = [
                element.getImageFromStyle(),
                element.getImageFromStyle('::before'),
                element.getImageFromStyle('::after'),
                element.getImageFromSrc()
            ];

            // Disabled because Shadow DOM is unstable
            // See https://github.com/foooomio/view-background-image/issues/12
            /*
            if (element.shadowRoot) {
                return acc.concat(
                    array, element.shadowRoot.getBackgroundImages(x, y)
                );
            }
            */

            return acc.concat(array);
        }, []);

        // Unique and Compact
        return images.filter((value, index, array) =>
            value && array.indexOf(value) === index
        );
    }
});

Object.defineProperties(Element.prototype, {
    getImageFromStyle: {
        value: function(pseudo) {
            const style = getComputedStyle(this, pseudo);
            const value = style.getPropertyValue('background-image');
            const matches = /url\("?(.+?)"?\)/.exec(value);
            return matches ? matches[1] : null;
        }
    },
    getImageFromSrc: {
        value: function() {
            if (this.tagName === 'IMG') {
                return this.currentSrc || this.src;
            }
        }
    }
});

{
    let images = [];

    document.addEventListener('contextmenu', e => {
        images = document.getBackgroundImages(e.clientX, e.clientY);
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        sendResponse(images.join(' '));
    });
}
