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
    if (x < rect.left || rect.right < x || y < rect.top || rect.bottom < y) {
      continue;
    }

    for (const pseudo of ['', '::before', '::after']) {
      for (const image of getComputedBackgroundImages(element, pseudo)) {
        images.add(image);
      }
    }

    if (element instanceof HTMLImageElement) {
      images.add(element.currentSrc);
    } else if (element instanceof SVGSVGElement) {
      if (element.ownerDocument.contentType === 'image/svg+xml') {
        images.add(element.ownerDocument.URL); // Object tag
      } else {
        images.add(getSVGDataURI(element)); // Inline SVG
      }
    }

    if (element.shadowRoot) {
      for (const image of getBackgroundImages(element.shadowRoot, x, y)) {
        images.add(image);
      }
    }
  }

  return [...images];
}

/**
 * @param {Element} element
 * @param {string} [pseudo]
 * @returns {Generator<string>}
 */
function* getComputedBackgroundImages(element, pseudo) {
  const style = getComputedStyle(element, pseudo);
  const values = [
    style.getPropertyValue('background-image'),
    style.getPropertyValue('content'),
  ];
  for (const value of values) {
    for (const [, url] of value.matchAll(/url\("(.+?)"\)/g)) {
      yield url.replaceAll('\\"', '"');
    }
  }
}

/**
 * @param {SVGSVGElement} element
 * @returns {string}
 */
function getSVGDataURI(element) {
  const svg = /** @type {SVGSVGElement} */ (element.cloneNode(true));
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
  return 'data:image/svg+xml,' + encodeURIComponent(svg.outerHTML);
}

if (chrome.runtime) {
  let x = 0;
  let y = 0;

  document.addEventListener('contextmenu', (e) => {
    x = e.clientX;
    y = e.clientY;
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message) {
      sendResponse(confirm(message));
    } else {
      sendResponse(getBackgroundImages(document, x, y));
    }
  });
}
