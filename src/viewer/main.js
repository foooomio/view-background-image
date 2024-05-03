'use strict';

async function main() {
  const key = new URLSearchParams(location.search).get('t');

  const response = await getResponse(key);

  if (typeof response === 'string') {
    document.getElementById('error').append(response);
    return;
  }

  if (!Array.isArray(response) || response.length === 0) {
    return;
  }

  const thumbnails = response.map((url) => {
    const img = Object.assign(document.createElement('img'), {
      src: url,
      className: 'thumbnail',
    });

    const a = Object.assign(document.createElement('a'), {
      href: url,
    });

    a.append(img);
    return a;
  });

  document.getElementById('gallery').append(...thumbnails);
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

try {
  main();
} catch (error) {
  console.error(error);
} finally {
  const DAY = 24 * 60 * 60 * 1000;
  removeExpired(Date.now() - DAY);
}
