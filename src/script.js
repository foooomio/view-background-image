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
            const url = encodeURIComponent(info.frameUrl || info.pageUrl);
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://script.google.com/macros/s/AKfycbwtacVYsZHc_n4qkVdfvjJE_3__rKwfeqTNNgZKPhH00VoKTAA/exec?url=' + url);
            xhr.send();
        }
    });
});
