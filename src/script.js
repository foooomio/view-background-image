chrome.runtime.onInstalled.addListener(function() {
	chrome.contextMenus.create({
		contexts: ['all'],
		id: 'background_img',
		title: chrome.i18n.getMessage('title')
	});
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
	chrome.tabs.sendMessage(tab.id, '', function(response) {
		if(response) {
			response.split(',').forEach(function(image) {
				chrome.tabs.create({
					index: tab.index + 1,
					url: image
				});
			});
		} else if(confirm(chrome.i18n.getMessage('failure'))) {
			var xhr, url = encodeURIComponent(info.frameUrl || info.pageUrl);
			xhr = new XMLHttpRequest();
			xhr.open('GET', 'https://script.google.com/macros/s/AKfycbwtacVYsZHc_n4qkVdfvjJE_3__rKwfeqTNNgZKPhH00VoKTAA/exec?url=' + url);
			xhr.send();
		}
	});
});
