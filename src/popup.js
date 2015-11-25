function getCurrentTabSize(callback) {

  chrome.tabs.query({}, function(tabs) {
    callback(tabs.length);
  });

}


function renderStatus(info) {
  document.getElementById('info').textContent = info;
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabSize(function(size) {
	  
    renderStatus('You have oppened '+size+' tabs');

  }, function(errorMessage) {
      renderStatus(errorMessage);
    });
});

