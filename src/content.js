'use strict';

/**
 * @param {Document|ShadowRoot} root
 * @param {number} x > 0
 * @param {number} y > 0
 * @returns {Set<string>}
 */
function getBackgroundImages(root, x, y) {
  /** @type {Set<string>} */
  const images = new Set();

  if (x <= 0 || y <= 0) {
    return images;
  }

  for (const element of root.querySelectorAll('*')) {
    // Hit Testing
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
    }

    if (element instanceof SVGSVGElement) {
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

  return images;
}

/**
 * @param {Element} element
 * @param {string} [pseudo]
 * @returns {Set<string>}
 */
function getComputedBackgroundImages(element, pseudo) {
  const style = getComputedStyle(element, pseudo);
  const values = [
    style.getPropertyValue('background-image'),
    style.getPropertyValue('content'),
  ];
  const images = new Set();
  for (const value of values) {
    for (const [, url] of value.matchAll(/url\("(.+?)"\)/g)) {
      images.add(url.replaceAll('\\"', '"'));
    }
  }
  return images;
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
  let root = document;
  let x = 0;
  let y = 0;

  document.addEventListener('contextmenu', (event) => {
    if (event.target instanceof Element) {
      root = event.target.ownerDocument;
    }
    x = event.clientX;
    y = event.clientY;
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    sendResponse([...getBackgroundImages(root, x, y)]);
  });
}
