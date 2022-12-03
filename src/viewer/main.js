'use strict';

chrome.runtime.sendMessage(null, (response) => {
  const list = document.getElementById('list');

  for (const image of response) {
    const img = new Image();
    img.src = image;
    list.append(img);
  }
});
