
console.log('Loading a web page');
var page1 = require('webpage').create();

var page = require('webpage').create();
var system = require('system');
var urlUtil = require('url');


var url = system.args[1];

var cache = {};

page.onResourceRequested = function(request) {
  //console.log('Request ' + JSON.stringify(request, undefined, 4));
  var u = urlUtil.parse(request.url);

  if(cache[u.host]==null){
  	console.log('-->'+u.host);
  	cache[u.host] = u.path;
  }
	
};
page.onResourceReceived = function(response) {
  //console.log('Receive ' + JSON.stringify(response, undefined, 4));
};

page.onLoadFinished = function(status) {
  console.log('Load Finished Status: ' + status);
};

var postBody = 'user=username&password=password';




page.open(url, function (status) {
console.log('Loaded');

  
// page1.open('http://localhost:9000/api/result', 'POST', postBody, function(status) {
//     console.log('Status: ' + status);
//       //phantom.exit();  
// });

  
});
