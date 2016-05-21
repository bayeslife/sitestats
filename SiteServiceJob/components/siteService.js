var config = require('../config/environment');

module.exports = {    
    getSites: function(callback,system) {

        console.log(config.SiteApp.host);

        var url = 'http://'+config.SiteApp.host+':'+config.SiteApp.port+'/api/sites';
        
        var page = require('webpage').create();
        
        if(system.env.DEBUG_SITE){
            console.log('Getting sites from:\t'+url);
        }
        page.open(url, function (status) {  
            if(status=='fail'){
                if(system.env.DEBUG_SITE){
                    console.log('Failure getting sites');
                }
                callback([]);
             } else {
                var json = JSON.parse(page.plainText);        
                if(system.env.DEBUG_SITE){
                    console.log('List of sites received:');
                    console.log(json);
                }
                callback(json);
            }
        });
    },
    saveSiteServices: function(data,callback,system) {        
        var url = 'http://'+config.SiteApp.host+':'+config.SiteApp.port+'/api/siteservices';

        if(system.env.LOGONLY){
            url += '?logOnly=true';
        }

        var page = require('webpage').create();
        
        var data = JSON.stringify(data);

        if(system.env.DEBUG_SITE){
             console.log('Save site service');
             console.log(data);
        }

        var settings = {
          operation: "POST",
          encoding: "utf8",
          headers: {
            "Content-Type": "application/json"
          },
          data: data
        };

        page.open(url, settings, function (status) {
            if(status=='success' && system.env.DEBUG_SITE){
                console.log('Saved Site Services');
            }else {
                
            }
            if(callback!=null) 
                callback();          
        });
    }
 };