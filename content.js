function getBackgroundImage(element) {
	while(element) {
		var bg = getComputedStyle(element).getPropertyValue('background-image');
		if(bg !== "none") return bg.match(/url\("?(.+?)"?\)/)[1];
		element = element.parentElement;
	}
}

function getOrdinaryImage(element) {
	if(element.tagName === 'IMG') return element.src;
	while(element) {
		var img = element.getElementsByTagName('img');
		if(img.length) return img[0].src;
		element = element.parentElement;
	}
}

var target, listener = function(e) { target = e.target; };

document.addEventListener('contextmenu', listener);

chrome.runtime.onMessage.addListener(
	function(message, sender, sendResponse) {
		sendResponse(
			getBackgroundImage(target) || getOrdinaryImage(target)
		);
	}
);
