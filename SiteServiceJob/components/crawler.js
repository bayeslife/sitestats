var system = require('system');
var urlUtil = require('url');



module.exports = {
    visitSite: function(url,saveSiteInfo,system,callback) {
        if(system.env.DEBUG_CRAWL)
          console.log(url);

        var siteLoaded = false;

        var page = require('webpage').create();
       
        var cache = [];

        var site = urlUtil.parse(url);

        var loadStart,loadLatest;

        page.onResourceError = function(resourceError) {
            page.reason = resourceError.errorString;
            page.reason_url = resourceError.url;
        };

        page.onResourceRequested = function(request) {
          
          loadLatest = new Date();

          //console.log('Request ' + JSON.stringify(request, undefined, 4));
          var reference = urlUtil.parse(request.url);

          var protocol = reference.protocol;
          if(site.host!=reference.host && cache[reference.host]==null && protocol.indexOf('http')==0){
            if(system.env.DEBUG_CRAWL){
              console.log('-->'+reference.host+'\t'+protocol);
            }
            cache[reference.host] = true;
          }
        };


        setTimeout(function() {
            page.close();

            var result = [];            

            for (var key in cache) {
              if (cache.hasOwnProperty(key)) {
                result.push(key);
              }
            }
          
            var loadTime = loadLatest - loadStart;
            if(system.env.DEBUG_CRAWL){
              console.log('Load Time\t'+ loadTime);
            }

            saveSiteInfo(siteLoaded,url,result,loadTime,callback);
          },20000);

        console.log(url);

        loadStart = new Date();        
        page.open(url, function (status) {
          siteLoaded = true;
          if ( status !== 'success' ) {
            console.log("ERROR opening url \"" + page.reason_url+ "\": " + page.reason);
          }else {
            siteLoaded = true;
          }          
        });
    }
 };



