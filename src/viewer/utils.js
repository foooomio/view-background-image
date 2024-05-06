export const DAY = 24 * 60 * 60 * 1000;

/**
 * @param {string} id
 * @returns {HTMLElement}
 */
export function $(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element ${id} not found`);
  }
  return element;
}

/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} tagName
 * @param {Record<string, any>} options
 * @param {(string | Node)[]} children
 * @returns {HTMLElementTagNameMap[K]}
 */
export function $e(tagName, options = {}, ...children) {
  const element = document.createElement(tagName);
  element.append(...children);
  return Object.assign(element, options);
}

/**
 * @param {number} expiration
 * @returns {void}
 */
export function removeExpiredCache(expiration) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && Number(key) < expiration) {
      localStorage.removeItem(key);
    }
  }
}
