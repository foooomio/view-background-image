// @ts-check

'use strict';

chrome.runtime.onInstalled.addListener(details => {
    if (details.reason === 'chrome_update') return;
    chrome.contextMenus.create({
        contexts: ['page', 'frame', 'selection', 'link', 'editable', 'image'],
        id: 'background_img',
        title: chrome.i18n.getMessage('title')
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.tabs.sendMessage(tab.id, '', { frameId: info.frameId }, response => {

        if (response === undefined) {
            chrome.tabs.executeScript({ code: '', frameId: info.frameId }, () => {
                const reason = chrome.runtime.lastError ? 'security' : 'reload';
                alert(chrome.i18n.getMessage(reason));
            });
            return;
        }

        if (!Array.isArray(response) || response.length === 0) {
            if (confirm(chrome.i18n.getMessage('failure'))) {
                chrome.tabs.create({
                    windowId: tab.windowId,
                    openerTabId: tab.id,
                    index: tab.index + 1,
                    url: 'https://github.com/foooomio/view-background-image/issues'
                });
            }
            return;
        }

        response.forEach(image => {
            chrome.tabs.create({
                windowId: tab.windowId,
                openerTabId: tab.id,
                index: tab.index + 1,
                url: image
            });
        });

    });
});
