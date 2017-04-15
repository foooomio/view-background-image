function getBackgroundImage(element) {
	var bg = getComputedStyle(element).getPropertyValue('background-image');
	if(bg !== "none") return bg.match(/url\("?(.+?)"?\)/)[1];
}

function getNormalImage(element) {
	if(element.tagName === 'IMG') return element.src;
}

var IDENTIFIER = 'view-background-image:';

document.addEventListener('contextmenu', function(e) {
	var images = [];
	var elements = document.elementsFromPoint(e.clientX, e.clientY);
	for(var i = 0, max = elements.length; i < max; i++) {
		var image = getBackgroundImage(elements[i]) || getNormalImage(elements[i]);
		if(image) images.push(image);
	}
	window.top.postMessage(IDENTIFIER + images.toString(), '*');
});

if(window.self === window.top) {
	var images;
	window.addEventListener('message', function(e) {
		if(e.data.indexOf && e.data.indexOf(IDENTIFIER) === 0) {
			images = e.data.slice(IDENTIFIER.length);
		}
	});
	chrome.runtime.onMessage.addListener(
		function(message, sender, sendResponse) {
			sendResponse(images);
		}
	);
}

