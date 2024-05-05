'use strict';

function init() {
  const extName = chrome.i18n.getMessage('extName');
  document.title = extName;
  document.querySelector('h1').textContent = extName;
}

init();

async function main() {
  const key = new URLSearchParams(location.search).get('t');

  const images = await getCachedImages(key);

  if (images.length === 0) {
    throw new Error('No Background Images');
  }

  setupGallery(images);
}

main()
  .catch((error) => {
    showError(error);
  })
  .finally(() => {
    removeExpiredCache(Date.now() - 7 * DAY);
  });
