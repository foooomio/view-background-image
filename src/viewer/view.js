'use strict';

/**
 * @param {string[]} images
 */
function setupGallery(images) {
  const thumbnails = images.map((image) => {
    const caption = image.startsWith('data:image/svg+xml') ? 'SVG' : image;
    return h(
      'figure',
      {},
      h('a', { href: image }, h('img', { src: image })),
      h('figcaption', {}, caption),
    );
  });

  document.getElementById('gallery').append(...thumbnails);
}

/**
 * @param {string} message
 */
function showError(message) {
  document.getElementById('error').append(message);
}
