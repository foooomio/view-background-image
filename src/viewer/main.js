import { getImages } from './connection.js';
import { showError } from './error.js';
import { setupGallery } from './gallery.js';
import { init } from './init.js';
import { DAY, removeExpiredCache } from './utils.js';

init();

try {
  const key = new URLSearchParams(location.search).get('t');

  const images = await getImages(key ?? '');

  if (images.length === 0) {
    throw new Error('No background images found.');
  }

  setupGallery(images);
} catch (error) {
  if (error instanceof Error) {
    showError(error);
  }
} finally {
  removeExpiredCache(Date.now() - 7 * DAY);
}
