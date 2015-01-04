chrome.contextMenus.create({
	id: "background_img",
	title: chrome.i18n.getMessage('title')
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
	chrome.tabs.sendMessage(tab.id, '', function(response) {
		if(response !== "none") {
			chrome.tabs.create({
				index: tab.index + 1,
				url: response.slice(4,-1)
			});
		} else {
			alert(chrome.i18n.getMessage('failure'));
		}
	});
});