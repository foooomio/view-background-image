function getBackgroundImage(element) {
	if(!element) return "none";
	var bg = getComputedStyle(element).getPropertyValue('background-image');
	return bg !== "none" ? bg : getBackgroundImage(element.parentElement);
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