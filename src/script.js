// @ts-check

'use strict';

chrome.contextMenus.create({
    contexts: ['page', 'frame', 'selection', 'link', 'editable', 'image'],
    id: 'background_img',
    title: chrome.i18n.getMessage('title')
}, () => {
    console.log(chrome.runtime.lastError);
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.tabs.sendMessage(tab.id, null, { frameId: info.frameId }, response => {

        if (chrome.runtime.lastError) {
            chrome.tabs.executeScript({ code: '', frameId: info.frameId }, () => {
                const reason = chrome.runtime.lastError ? 'security' : 'reload';
                alert(chrome.i18n.getMessage(reason));
            });
            return;
        }

        if (!Array.isArray(response) || response.length === 0) {
            const message = chrome.i18n.getMessage('failure');
            chrome.tabs.sendMessage(tab.id, message, { frameId: info.frameId }, result => {
                if (!result) return;
                chrome.tabs.create({
                    windowId: tab.windowId,
                    openerTabId: tab.id,
                    index: tab.index + 1,
                    url: 'https://github.com/foooomio/view-background-image/issues'
                });
            });
            return;
        }

        for (const image of response) {
            chrome.tabs.create({
                windowId: tab.windowId,
                openerTabId: tab.id,
                index: tab.index + 1,
                active: !shouldOpenInBackground(info),
                url: image
            });
        }

    });
});

/**
 * @param {any} info
 * @returns {boolean}
 * @description Currently this function works well only on Firefox.
 */
function shouldOpenInBackground(info) {
    if (info.button === 1) return true;

    if (info.modifiers && info.modifiers.length === 1) {
        const key = info.modifiers[0];
        return key === 'Ctrl' || key === 'Command';
    }

    return false;
}
