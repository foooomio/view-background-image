'use strict';

/**
 * @param {string[]} images
 */
function setupGallery(images) {
  const figures = images.map((image) => {
    const caption = image.startsWith('data:image/svg+xml') ? 'SVG' : image;
    return h(
      'figure',
      {},
      h('a', { href: image }, h('img', { src: image })),
      h('figcaption', {}, caption),
    );
  });

  document.getElementById('gallery').append(...figures);
}

/**
 * @param {Error} error
 */
function showError(error) {
  document.getElementById('error').append(error.message);
  document.getElementById('error').style.display = 'block';
}
