var code = "[ getComputedStyle(document.body).getPropertyValue('background-image'),  location.href ]";

chrome.contextMenus.create({
	id: "background_img",
	title: "背景画像だけを表示"
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
	var url = info.frameUrl || info.pageUrl;
	
	chrome.tabs.executeScript(
		null,
		{code: code, allFrames: true},
		function(results) {
			var i, result, flag = false;
			
			for(i = 0; result = results[i]; i++) {
				if(result[1] === url && result[0].slice(0,3) === "url") {
					chrome.tabs.create({
						index: tab.index + 1,
						url: result[0].slice(4,-1)
					});
					flag = true;
				}
			}
			
			if(flag === false) {
				alert("背景画像を取得できません。");
			}
		}
	);
	
});