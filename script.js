var code = "[ getComputedStyle(document.body).getPropertyValue('background-image'),  location.href ]"; 

chrome.contextMenus.create({
	id: "background_img",
	title: "背景画像だけを表示"
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
	var url = info.frameUrl || info.pageUrl;
	
	chrome.tabs.executeScript(null, {code: code, allFrames: true},
		function(results) {
			var flag = false;
			
			results.forEach(function(result) {console.log(result);
				if(result[0].slice(0,3) !== "url" || result[1] !== url) return;
				
				chrome.tabs.create({
					index: tab.index + 1,
					url: result[0].slice(4,-1)
				});
				flag = true;
			});
			
			if(!flag) {
				alert("背景画像を取得できません。");
			}
		}
	);
	
});