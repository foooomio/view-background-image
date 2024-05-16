/**
 * @param {unknown} value
 * @returns {value is string[]}
 */
function isArrayOfString(value) {
  return (
    Array.isArray(value) && value.every((item) => typeof item === 'string')
  );
}

/**
 * @param {string} key
 * @returns {Promise<string[]>}
 * @throws {Error}
 */
export async function getImages(key) {
  const cache = localStorage.getItem(key);

  if (cache) {
    return JSON.parse(cache);
  }

  /**
   * `string[]` is an array of background image.
   * `string` is an error message.
   * `null` if invalid key.
   *
   * @type {unknown}
   */
  const response = await chrome.runtime
    .sendMessage(key)
    .catch((error) => error.message);

  if (!isArrayOfString(response)) {
    throw new Error(String(response));
  }

  localStorage.setItem(key, JSON.stringify(response));
  return response;
}
