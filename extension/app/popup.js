var found = false;
var user = "";
var loged = false;
var bookmarkid;
var url;
var name;
var userName;

//Code And Encode B64
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}


function logIn(){
	user = Base64.encode($('#userLogin').val() +':'+$('#pass').val());
	userName =$('#userLogin').val();
	$.ajaxSetup({
	  headers : {
		'Content-Type': 'application/json',
		'Authorization' : 'Basic ' + user
	  }
	});

	$.getJSON('http://adriemsworkshop.noip.me:8081/bookmarks/api/auth')
		.success(function() {
			loged=true;
			chrome.storage.sync.set({'encode': user});
			chrome.storage.sync.set({'userName': userName});
			fillInfo(url,name);
			})
		.error(function() {
			loged = false; 
			$('#logInError').show();})	
}

function logOut(){
	loged = false;
	url = "";
	name = "";
	chrome.storage.sync.set({'encode': "null"});
	chrome.storage.sync.set({'userName': "null"});
	startApp();
}


//Use API for update/add bookmark
function add() {
	if(loged){
	
		var _bookmark = {
            name: $('#name').val(),
            url: $('#url').val(),
            tags: $('#tags').val(),
            description: $('#desc').val()
        };
	
		//EDIT
		if(found){
			$.ajaxSetup({
			  headers : {
				'Content-Type': 'application/json',
				'Authorization' : 'Basic ' + user
			  }
			});
			
		
			$.ajax({url: 'http://adriemsworkshop.noip.me:8081/bookmarks/api/bookmarks/'+bookmarkid, data: JSON.stringify(_bookmark),
					type: 'PATCH'})
			.success(function() {
				$('#actionDone').html("Bookmark edited");
				$('#actionDone').show();
				fillInfo(url,name);
			})
			.error(function() {
				$('#actionDone').html("Cant edit Bookmark");
				$('#actionDone').show();
				fillInfo(url,name);
			})		
		}
		//ADD
		else{
			$.ajaxSetup({
			  headers : {
				'Content-Type': 'application/json',
				'Authorization' : 'Basic ' + user
			  }
			});
		
			$.ajax({url: 'http://adriemsworkshop.noip.me:8081/bookmarks/api/bookmarks/', data: JSON.stringify(_bookmark),
					type: 'POST'})
			.success(function() {
				$('#actionDone').html("Bookmark added");
				$('#actionDone').show();
				fillInfo(url,name);
			})
			.error(function() {
				$('#actionDone').html("Cant add Bookmark");
				$('#actionDone').show();
				fillInfo(url,name);
			})	
		}
	}
}

//USE API for delete bookmark
function deleteBtn() {
	if(loged){
	
		$.ajaxSetup({
		  headers : {
			'Content-Type': 'application/json',
			'Authorization' : 'Basic ' + user
		  }
		});
	
		$.ajax({url: 'http://adriemsworkshop.noip.me:8081/bookmarks/api/bookmarks/'+bookmarkid,
				type: 'DELETE'})
		.success(function() {
			$('#actionDone').html("Bookmark deleted");
			$('#actionDone').show();
			fillInfo(url,name);
		})
		.error(function() {
			$('#actionDone').html("Cant delete Bookmark");
			$('#actionDone').show();
			fillInfo(url,name);
		})		
	}
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
	if(loged){
		$.ajaxSetup({
		  headers : {
			'Content-Type': 'application/json',
			'Authorization' : 'Basic ' + user
		  }
		});

		$.getJSON('http://adriemsworkshop.noip.me:8081/bookmarks/api/bookmarks/bookmark?url='+url)
			.success(function(json) {
				$('#name').val(json.name);
				$('#url').val(json.url);
				$('#tags').val(json.tags);
				$('#desc').val(json.description);
				found = true;
				bookmarkid = json._id;
				startApp();
			})
			.error(function() {
				$('#name').val(name);
				$('#url').val(url);
				$('#tags').val("");
				$('#desc').val("");
				found = false;
				bookmarkid = 0;
				startApp();
			})
	}
	
	
}

function startApp(){	
	if(loged){
		$('#logIn').hide();
		$('#notLogged').hide();
		$('#logOut').show();
		$('#loggedAs').html("Logged as: "+userName);
	}
	else{
		$('#logIn').show();
		$('#notLogged').show();
		$('#logOut').hide();
	}
	
	if(found){
		$('#add').html("Edit");
		$('#delete').show();
	}
	else{
		$('#add').html("Add");
		$('#delete').hide();
	}
	


}

$("#add").click(add);

$('#delete').click(deleteBtn);

$("#loginBtn").click(logIn);

$("#reg").click(redirect);

$('#logoutBtn').click(logOut);

function redirect(){
	chrome.tabs.create({url: "http://adriemsworkshop.noip.me:8081/bookmarks/#/access"});
}


document.addEventListener('DOMContentLoaded', function() {
	
	
	chrome.storage.sync.get(['userName','encode'], function(result){
        userName = result.userName;
		user = result.encode;
		if(userName === "null"){ loged = false;}
		else {
			loged = true;
		}
    });
	
	getCurrentTabInfo(function(urlG,nameG) {

        url = urlG;
		name = nameG;
		fillInfo(url,name);

    }, function(errorMessage) {
        renderStatus(errorMessage);
    });
	
	
	
});