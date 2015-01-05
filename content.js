function getBackgroundImage(element) {
	while(element) {
		var bg = getComputedStyle(element).getPropertyValue('background-image');
		if(bg !== "none") return bg;
		element = element.parentElement;
	}
	return "none";
}

var element, listener = function(e) { element = e.target; };
document.addEventListener('contextmenu', listener);
Array.prototype.forEach.call(frames, function(frame) {
	frame.document.addEventListener('contextmenu', listener);
});

chrome.runtime.onMessage.addListener(
	function(message, sender, sendResponse) {
		sendResponse(getBackgroundImage(element));
	}
);