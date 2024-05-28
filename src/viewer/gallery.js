import { $, $e } from './utils.js';

/**
 * @param {string} url
 * @returns {string}
 */
function getCaption(url) {
  const [, mediaType] = url.match(/data:(.+?)[,;]/) ?? [];
  return mediaType ?? url;
}

/**
 * @param {string[]} images
 */
export function setupGallery(images) {
  const figures = images.map((image) => {
    return $e(
      'figure',
      {},
      $e('a', { href: image }, $e('img', { src: image })),
      $e('figcaption', {}, getCaption(image)),
    );
  });

  $('gallery').append(...figures);
}
