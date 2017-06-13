function getBackgroundImage(element) {
    var bg = getComputedStyle(element).getPropertyValue('background-image');
    if(bg !== "none" && bg.match(/url\("?(.+?)"?\)/)) return RegExp.$1;
}

function getNormalImage(element) {
    if(element.tagName === 'IMG') return element.src;
}

function getImages(element, x, y) {
    var images = [];
    var elements = element.elementsFromPoint(x, y);
    for(var i = 0, max = elements.length; i < max; i++) {
        if(elements[i].shadowRoot) images = images.concat(getImages(elements[i].shadowRoot, x, y));
        var image = getBackgroundImage(elements[i]) || getNormalImage(elements[i]);
        if(image) images.push(image);
    }
    return images;
}

var IDENTIFIER = 'view-background-image:';

document.addEventListener('contextmenu', function(e) {
    window.top.postMessage(IDENTIFIER + getImages(document, e.clientX, e.clientY).join(' '), '*');
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

