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
    }
  );
});

const storage = new Map();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sendResponse(storage.get(sender.url));
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const response = await chrome.tabs.sendMessage(tab.id, null, {
    frameId: info.frameId,
  });

  const key = chrome.runtime.getURL('viewer/index.html') + '?' + Date.now();

  if (chrome.runtime.lastError) {
    // chrome.tabs.executeScript({ code: '', frameId: info.frameId }, () => {
    //   const reason = chrome.runtime.lastError ? 'security' : 'reload';
    //   alert(chrome.i18n.getMessage(reason));
    // });
    return;
  }

  if (!Array.isArray(response) || response.length === 0) {
    // const message = chrome.i18n.getMessage('failure');
    // chrome.tabs.sendMessage(
    //   tab.id,
    //   message,
    //   { frameId: info.frameId },
    //   (result) => {
    //     if (!result) return;
    //     chrome.tabs.create({
    //       windowId: tab.windowId,
    //       openerTabId: tab.id,
    //       index: tab.index + 1,
    //       url: 'https://github.com/foooomio/view-background-image/issues',
    //     });
    //   }
    // );
    return;
  }

  storage.set(key, response);

  chrome.tabs.create({
    windowId: tab.windowId,
    openerTabId: tab.id,
    index: tab.index + 1,
    active: false,
    url: key,
  });
});
