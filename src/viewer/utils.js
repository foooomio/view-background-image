'use strict';

const DAY = 24 * 60 * 60 * 1000;

/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} tagName
 * @param {Record<string, any>} options
 * @param {(string | Node)[]} children
 * @returns {HTMLElementTagNameMap[K]}
 */
function h(tagName, options = {}, ...children) {
  const element = document.createElement(tagName);
  element.append(...children);
  return Object.assign(element, options);
}
