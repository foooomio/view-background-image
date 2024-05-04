'use strict';

/**
 * @param {string} key
 * @returns {Promise<string[]>}
 * @throws {Error}
 */
async function getCachedImages(key) {
  const cache = localStorage.getItem(key);

  if (cache) {
    return JSON.parse(cache);
  }

  /**
   * `string[]` is an array of background image.
   * `string` is an error message.
   * `null` could be returned.
   *
   * @type {string[] | string | null}
   */
  const response = await chrome.runtime
    .sendMessage(key)
    .catch((error) => error.message);

  if (!Array.isArray(response)) {
    throw new Error(typeof response === 'string' ? response : 'Unknown Error');
  }

  localStorage.setItem(key, JSON.stringify(response));
  return response;
}

/**
 * @param {number} expiration
 * @returns {void}
 */
function removeExpiredCache(expiration) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (Number(key) < expiration) {
      localStorage.removeItem(key);
    }
  }
}
