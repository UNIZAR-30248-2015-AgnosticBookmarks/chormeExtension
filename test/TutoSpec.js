process.env.NODE_ENV = 'test'; 
var request = require('request');
var global.chrome = require('sinon-chrome');
var popup = require('../scr/popup.js');

describe("Chrome extension tutorial", function() {

    describe("GET /", function() {

        it("Testing 3 tabs, should return 3 tabs", function(){
			
			chrome.tabs.query.yields([1, 2, 3]); // 3 tabs
			var tabsNumber;
			var done = false;  
            var timeout = 750

            runs(function() {
                
				popup.getCurrentTabSize(function(tabs){
					tabsNumber = tabs;
					done = true;
				}); 
				
            });

            waitsFor(function() {
                return done;
            }, "response", timeout);

            runs(function() {
                expect(tabsNumber).toBe(3);
            });
            
        });
    });

});

