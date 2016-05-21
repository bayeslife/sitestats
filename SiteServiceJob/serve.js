var page = require('webpage').create();
var system = require('system');
var urlUtil = require('url');

var async = require('async');

var moment = require('moment');

var crawler = require('./components/crawler');

var siteService = require('./components/siteService');

var urls = [];

var siteResults = [];


function debug(msg){
  if(system.env.DEBUG_MAIN)
    console.log(msg);
}

var timeout = system.args[1];
  debug('Timeout:' + timeout);

var site = system.args[2];
if(site != undefined) { 
  debug('Site:\t'+site);
  urls.push(site);
}

var sites = [];

function saveSiteInfo(success,url,siteServices,loadTime,callback){        
    if(success){
      var siteResult = {};

      var u = urlUtil.parse(url);

      siteResult.site = u.host;
      siteResult.loadTime = loadTime;
      siteResult.references = siteServices;

      siteService.saveSiteServices(siteResult,callback,system);
    }else {
      callback();
    }
}

/////////////////////
function getSites(callback) {
    siteService.getSites(function(data){
        urls = [];
        for(var i=0;i<data.length;i++){          
          urls.push(data[i].site);         
        }
        debug('Sites:\t'+ urls);
        if(callback!=null)
          callback();        
    },system)
}  

////////////////////////////
function refresh(ondone) {
    //console.log(urls);
    debug("Refreshing Site Services");
    
    if(urls.length==0){
      ondone();
      return;
    }

    async.forEachOfSeries(urls,   
      function(url,index,callback){          
          crawler.visitSite(url,saveSiteInfo,system,callback);
      },
      function(err){
        //console.log(JSON.stringify(siteResults));        
        ondone();
      })
}

function serve() {
    async.whilst(      
      function () {
          return true;
      },                 
      function (callback) {
          debug('Cycle Starting');          
          getSites(function() {
              refresh(function() {
                debug('Cycle Stopped');
                  setTimeout(function () {  callback();  }, timeout);                      
                });
            });          
        }
    );
}

function process() {
    refresh(function() {     
      phantom.exit();      
    });  
}

if(site==null)
  serve();
else 
  process();




