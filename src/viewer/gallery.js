import { $, $e } from './utils.js';

/**
 * @param {string[]} images
 */
export function setupGallery(images) {
  const figures = images.map((image) => {
    const caption = image.startsWith('data:image/svg+xml') ? 'SVG' : image;
    return $e(
      'figure',
      {},
      $e('a', { href: image }, $e('img', { src: image })),
      $e('figcaption', {}, caption),
    );
  });

  $('gallery').append(...figures);
}
