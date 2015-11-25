process.env.NODE_ENV = 'test'; 
var request = require('request');
var chrome = require('sinon-chrome');

describe("Chrome extension tutorial", function() {
	


    describe("GET /", function() {

        it("Testing 3 tabs, should return 3 tabs", function(){
			
			chrome.tabs.query.yields([1, 2, 3]); // 3 tabs
			var tabsNumber;
			var done = false;  
            var timeout = 750
			var n=0;

			chrome.tabs.query({}, function(tabs) {
					n=tabs.length;
					done = true;
					expect(tabs.length).toBe(3);
				});
				
				
            

            waitsFor(function() {
                return done;
            }, "response", timeout);

            runs(function() {
                expect(n).toBe(3);
            });
            
        });
    });
	

});

