//
// script.js
//

'use strict';

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        contexts: ['page', 'frame', 'selection', 'link', 'editable',  'image', 'video', 'audio'],
        id: 'background_img',
        title: chrome.i18n.getMessage('title')
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.tabs.sendMessage(tab.id, '', response => {
        if (response) {
            response.split(' ').map(image => {
                chrome.tabs.create({
                    index: tab.index + 1,
                    url: image
                });
            });
        } else if(confirm(chrome.i18n.getMessage('failure'))) {
            chrome.tabs.create({
                index: tab.index + 1,
                url: 'https://chrome.google.com/webstore/detail/cegndknljaapfbnmfnagomhhgbajjibd/support'
            });
        }
    });
});
