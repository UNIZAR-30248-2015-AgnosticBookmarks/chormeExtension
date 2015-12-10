function getCurrentTabInfo(callback) {

    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tabs) {
        // and use that tab to fill in out title and url
        var tab = tabs[0];
        console.log(tab.url);
        callback(tab.url, tab.title);
    });

}


function renderStatus(url,name) {
    document.getElementById('name').value = name;
    document.getElementById('url').value = url;
    document.getElementById('tags');
}

document.addEventListener('DOMContentLoaded', function() {
    getCurrentTabInfo(function(url,name) {

        renderStatus(url,name);

    }, function(errorMessage) {
        renderStatus(errorMessage);
    });
});