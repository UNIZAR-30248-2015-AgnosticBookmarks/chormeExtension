var found = false;
var user = "";

//Code And Encode B64
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

//Use API
function logIn(){

	user = Base64.encode($('#userLogin').val() + ":" + $('#pass').val());
	startApp();
}

//Use API for update/add bookmark
function add() {
	
	found = true;
	startApp();
}


//Gets the current tabInfo
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

	//Found = Try to get the info from the API
	//http://adriemsworkshop.noip.me:8081/bookmarks/api/bookmarks/bookmark
	
	var jsonRespExample = {
							  "name": "d2jsp",
							  "owner": "5696ef4e985a950221cccf7f",
							  "url": "http://www.d2jsp.org",
							  "description": "DIABLO FREAKS",
							  "_id": "5696f2bd985a950221cccf89",
							  "__v": 0,
							  "created_at": "2016-01-14T00:58:37.113Z",
							  "tags": []
							}
	
	if(!found){
		$('#name').val(name);
		$('#url').val(url);
	}
	else{
		$('#name').val(jsonRespExample.name);
		$('#url').val(jsonRespExample.url);
		$('#tags').val(jsonRespExample.tags);
		$('#desc').val(jsonRespExample.description);
	}
}

function startApp(){
	if(user != ""){
		$('#logIn').hide();
		$('#notLogged').hide();
	}
	else{
		$('#logIn').show();
		$('#notLogged').show();
	}
	
	if(found){
		$('#add').html("Edit");
	}
	else{
		$('#add').html("Add");
	}

    getCurrentTabInfo(function(url,name) {

        fillInfo(url,name);

    }, function(errorMessage) {
        renderStatus(errorMessage);
    });
}

$("#add").click(add);

$("#loginBtn").click(logIn);


document.addEventListener('DOMContentLoaded', function() {
	startApp();
});