//
// content.js
//

'use strict';

/**
 * @param {Document|ShadowRoot} node
 * @param {number} x > 0
 * @param {number} y > 0
 * @returns {string[]}
 */
function getBackgroundImages(node, x, y) {
    if (x <= 0 || y <= 0) return [];

    /** @type {Set<string>} */
    const images = new Set();

    for (const element of node.querySelectorAll('*')) {
        const rect = element.getBoundingClientRect();
        if (x < rect.left || rect.right < x || y < rect.top || rect.bottom < y) continue;

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
            const results = getBackgroundImages(element.shadowRoot, x, y);
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
        results.push(p.replace(/\\"/g, '"'));
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
    let x = 0, y = 0;

    document.addEventListener('contextmenu', e => {
        x = e.clientX;
        y = e.clientY;
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        sendResponse(getBackgroundImages(document, x, y));
    });
}
