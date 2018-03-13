//
// script.js
//

'use strict';

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        contexts: ['page', 'frame', 'selection', 'link', 'editable', 'image'],
        id: 'background_img',
        title: chrome.i18n.getMessage('title')
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.tabs.sendMessage(tab.id, '', response => {

        if (response === undefined) {
            alert(chrome.i18n.getMessage('reload'));
            return;
        }

        if (response === '' || typeof response !== 'string') {
            if (confirm(chrome.i18n.getMessage('failure'))) {
                chrome.tabs.create({
                    index: tab.index + 1,
                    url: 'https://github.com/foooomio/view-background-image/issues'
                });
            }
            return;
        }

        response.split(' ').map(image => {
            chrome.tabs.create({
                index: tab.index + 1,
                url: image
            });
        });

    });
});
