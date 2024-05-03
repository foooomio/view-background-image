'use strict';

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

/**
 * @param {string[]} urls
 */
function setupGallery(urls) {
  const thumbnails = urls.map((url) => {
    return h('a', { href: url }, h('img', { src: url }));
  });

  document.getElementById('gallery').append(...thumbnails);
}

/**
 * @param {string} message
 */
function showError(message) {
  document.getElementById('error').append(message);
}

/**
 * @param {string} key
 * @returns {Promise<string[] | string | null>}
 */
async function getResponse(key) {
  let response = JSON.parse(localStorage.getItem(key));

  if (!response) {
    response = await chrome.runtime
      .sendMessage(key)
      .catch((error) => error.message);
    localStorage.setItem(key, JSON.stringify(response));
  }

  return response;
}

/**
 * @param {number} olderThan
 * @returns {void}
 */
function removeExpired(olderThan) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (Number(key) < olderThan) {
      localStorage.removeItem(key);
    }
  }
}

async function main() {
  const key = new URLSearchParams(location.search).get('t');

  const response = await getResponse(key);

  if (typeof response === 'string') {
    showError(response);
    return;
  }

  if (!Array.isArray(response) || response.length === 0) {
    showError('Unknown Error');
    return;
  }

  setupGallery(response);
}

const DAY = 24 * 60 * 60 * 1000;

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    removeExpired(Date.now() - DAY);
  });
