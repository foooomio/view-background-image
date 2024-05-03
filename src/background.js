'use strict';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create(
    {
      contexts: ['page', 'frame', 'selection', 'link', 'editable', 'image'],
      id: 'background_img',
      title: chrome.i18n.getMessage('title'),
    },
    () => {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError);
      }
    },
  );
});

const cache = new Map();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sendResponse(cache.get(message));
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const response = await chrome.tabs
    .sendMessage(tab.id, null, { frameId: info.frameId })
    .catch((error) => error.message);

  const key = Date.now().toString();

  cache.set(key, response);

  chrome.tabs.create({
    windowId: tab.windowId,
    openerTabId: tab.id,
    index: tab.index + 1,
    active: false,
    url: `${chrome.runtime.getURL('viewer/index.html')}?t=${key}`,
  });
});
