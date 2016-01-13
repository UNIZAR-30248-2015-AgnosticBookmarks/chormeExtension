function getCurrentTabInfo(callback) {

    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tabs) {
        var tab = tabs[0];
        callback(tab.url, tab.title);
    });

}


function fillInfo(url,name) {
    document.getElementById('name').value = name;
    document.getElementById('url').value = url;
    document.getElementById('tags');
    document.getElementById('desc').value = desc;
}

document.addEventListener('DOMContentLoaded', function() {
    getCurrentTabInfo(function(url,name) {

        fillInfo(url,name);

    }, function(errorMessage) {
        renderStatus(errorMessage);
    });
});