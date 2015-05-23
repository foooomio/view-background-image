function getBackgroundImage(element) {
	while(element) {
		var bg = getComputedStyle(element).getPropertyValue('background-image');
		if(bg !== "none") return bg.slice(4,-1);
		element = element.parentElement;
	}
}

var target, listener = function(e) { target = e.target; };

document.addEventListener('contextmenu', listener);

Array.prototype.forEach.call(frames, function(frame) {
	frame.document.addEventListener('contextmenu', listener);
});

chrome.runtime.onMessage.addListener(
	function(message, sender, sendResponse) {
		sendResponse(getBackgroundImage(target));
	}
);
