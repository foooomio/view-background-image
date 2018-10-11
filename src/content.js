//
// content.js
//

'use strict';

/**
 * @param {Document|ShadowRoot} node
 * @param {number} x
 * @param {number} y
 * @returns {Promise<string[]>}
 */
async function getBackgroundImages(node, x, y) {
    /** @type {Set<string>} */
    const images = new Set();

    for (const element of node.elementsFromPoint(x, y)) {
        if (element.getRootNode() !== node) continue;

        for (const pseudo of ['', '::before', '::after']) {
            const results = getComputedBackgroundImages(element, pseudo);
            results.forEach(result => images.add(result));
        }

        if (element instanceof HTMLImageElement) {
            images.add(element.currentSrc);
        } else if (element instanceof SVGSVGElement) {
            if (element.ownerDocument.contentType === 'image/svg+xml') {
                // Object tag
                images.add(element.ownerDocument.URL);
            } else {
                // Inline SVG
                images.add(getSVGDataURI(element));
            }
        }

        if (element.shadowRoot) {
            const results = await getBackgroundImages(element.shadowRoot, x, y);
            results.forEach(result => images.add(result));
        }
    }

    return [...images];
}

/**
 * @param {Element} element
 * @param {string} [pseudo]
 * @returns {string[]}
 */
function getComputedBackgroundImages(element, pseudo) {
    const style = getComputedStyle(element, pseudo);
    const value = style.getPropertyValue('background-image');
    const results = [];
    value.replace(/url\("?(.+?)"?\)/g, (match, p) => {
        results.push(p.replace(/\\"/g,'"'));
    });
    return results;
}

/**
 * @param {SVGSVGElement} element
 * @returns {string}
 */
function getSVGDataURI(element) {
    const svg = element.cloneNode(true);
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    return 'data:image/svg+xml,' + svg.outerHTML;
}

if (chrome.runtime) {
    /** @type {Promise<string[]>} */
    let promise;

    document.addEventListener('contextmenu', e => {
        promise = getBackgroundImages(document, e.clientX, e.clientY);
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        promise.then(images => sendResponse(images));
        return true;
    });
}
