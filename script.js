chrome.contextMenus.create({
	id: "background_img",
	title: "背景画像だけを表示"
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
	chrome.tabs.sendMessage(tab.id, '', function(response) {
		if(response !== "none") {
			chrome.tabs.create({
				index: tab.index + 1,
				url: response.slice(4,-1)
			});
		} else {
			alert("背景画像を取得できません。");
		}
	});
});