/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/siteservices              ->  index
 * POST    /api/siteservices              ->  create
 * GET     /api/siteservices/:id          ->  show
 * PUT     /api/siteservices/:id          ->  update
 * DELETE  /api/siteservices/:id          ->  destroy
 */

'use strict';

//var debug = require('debug')('siteService.controller');
function debug(msg){
  console.log(msg);
}

var _ = require('lodash');
var P = require('bluebird');
import config from '../../config/environment';

var sql = require('../../sql');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

exports.index = function(req, res) {
  if(req.query.service!=null){
    sql.SiteService.findAll({
      limit: 100,
      where: {
        service: req.query.service        
      }
    }).then(responseWithResult(res));   
  }else {
    responseWithResult([]);
  }
}

// function updateSiteService(site,additions,unchanged,drops){
//   var now = new Date();    
  
//   _.map(unchanged,function(item){
//     sql.SiteService.upsert({          
//           key: site +  item,
//           site: site,
//           service: item,
//           dropCount: 0,
//           verifiedAt: now
//       }).then(function(){
//         return null;        
//       });
//   });
//   _.map(additions,function(item){
//     sql.SiteService.upsert({          
//           key: site +  item,
//           site: site,
//           service: item,
//           dropCount: 0,
//           verifiedAt: now
//       }).then(function(){
//         return null;        
//       });
//   });
//   _.map(drops,function(item){
//     sql.SiteService.findOne({where: {
//       key: site + item
//     }}).then(function(record){
//       if(record!=null){
//         sql.SiteService.upsert({          
//             key: site +  item,
//             site: site,
//             service: item,
//             dropCount: record.dropCount+1,
//             verifiedAt: now
//         }).then(function(){
//           return null; 
//         });
//       }
//       return null;
//     });
    
//   });
// }

// function insertAdditions(site,additions,done){
//    console.log('Insert Additions');   
//    var now = new Date();   
//    var creates = _.map(additions,function(addition){
//       var r = {};
//       r.service = addition;
//       r.operation = 'Add';
//       r.changeDate= now;
//       r.site = site;
//       return r;      
//    });
//    sql.SiteServiceChange.bulkCreate(creates).then(function(){        
//         done();        
//         return null;
//     });
// }
// var insertAdditionsAsync = P.promisify(insertAdditions);

// function insertDrops(site,drops,callback){
//   console.log('Insert Drops:' + site+' '+drops.length);  
//   var done = _.after(drops.length,function(){
//     callback();
//   });
//   _.map(drops,function(drop){      
//       sql.SiteService.findOne({
//         where: {
//             key: site + drop,
//             dropCount: 5                     
//         }
//       }).then(function(record){
//         console.log('record');  
//         if(record!=null){
//           sql.SiteServiceChange.create({                    
//             site: site,
//             service: drop,
//             operation: 'Drop',
//             changeDate: now
//           }).then(function(){
//             done();
//             return null});
//           }
//         return null;
//       });
//   }); 
// }
// var insertDropsAsync = P.promisify(insertDrops);

// function insertChanges(site,additions,drops){
//   var now = new Date();
//   _.map(additions,function(addition){
//       sql.SiteServiceChange.create({                    
//           site: site,
//           service: addition,
//           operation: 'Add',
//           changeDate: now
//       }).then(function(){
//         return null});
//     });
//   _.map(drops,function(drop){
//       sql.SiteService.findOne({
//         where: {
//             key: site + drop,
//             dropCount: 5                     
//         }
//       }).then(function(record){
//         if(record!=null){
//           sql.SiteServiceChange.create({                    
//             site: site,
//             service: drop,
//             operation: 'Drop',
//             changeDate: now
//           }).then(function(){
//             return null});
//           }
//         return null;
//       });  
//   }); 
// };


function updateSiteService(site,additions,unchanged,drops){
  var promise;
  var result = [];
  var now = new Date();    
  
  _.map(unchanged,function(item){
    promise = sql.SiteService.upsert({          
          key: site +  item,
          site: site,
          service: item,
          dropCount: 0,
          verifiedAt: now
      });
    result.push(promise);
  });
  _.map(additions,function(item){
    promise = sql.SiteService.upsert({          
          key: site +  item,
          site: site,
          service: item,
          dropCount: 0,
          verifiedAt: now
      });
    result.push(promise);
  });
  _.map(drops,function(item){
    promise = sql.SiteService.findOne({where: {
      key: site + item
    }}).then(function(record){
      if(record!=null){
        sql.SiteService.upsert({          
            key: site +  item,
            site: site,
            service: item,
            dropCount: record.dropCount+1,
            verifiedAt: now
        }).then(function(){
          return null; 
        });
      }
      return null;
    });
    result.push(promise);    
  });
  return result;
}

function insertChanges(site,additions,drops){
  var promise;
  var result = [];
  var now = new Date();
  _.map(additions,function(addition){
        promise = sql.SiteServiceChange.create({                    
          site: site,
          service: addition,
          operation: 'Add',
          changeDate: now
        })
      result.push(promise);
    });

  _.map(drops,function(drop){
      promise = sql.SiteService.findOne({
            where: {
                key: site + drop,
                dropCount: 5                     
            }
          }).then(function(record){
            if(record!=null){
              sql.SiteServiceChange.create({                    
                site: site,
                service: drop,
                operation: 'Drop',
                changeDate: now
              }).then(function(){
                return null});
              }
            return null;
          });    
      result.push(promise);  
  });
  return result; 
};


function deleteDrops(site,drops){  
  var promise;
  var result = [];
 _.map(drops,function(drop){
      promise = sql.SiteService.findOne({
        where: {
            key: site + drop,
            dropCount: { $gt: 5 }                     
        }
      }).then(function(record){
        if(record!=null){
            record.destroy().then(function(){
              debug("Destroyed Record:\t"+ record.key);
              return null;
           });
        }
        return null;
      });      
      result.push(promise);
    });  
 return result;
}

function uploadLoadTime(site,loadTime){  
  sql.Site.findOne({
    where: {site : site}
  }).then(function(record){
      if(record!=null){
        record.loadTime = loadTime;      
        record.save().then(function(){return null;})
      }
      return null;
  }); 
}

function standardizeServices(services){
   return new Promise(function(resolve,reject){
      var result = [];
       var done = _.after(services.length,function(){
          debug('standardized'+ result);
          resolve(result);
       });
     
       _.forEach(services,function(service){
          debug("Query if alias exists for:" + service);
          sql.ServiceAlias.findOne({ 
            where: {
              alias: service
            }
          }).then(function(servicealias){      
            if(servicealias==null){
              debug("No alias exists for:" + service);              
              result.push(service);
              done();        
            }
            else{
              debug("Found alias ["+service+"] exists and canonical is:" + servicealias.service);              
              result.push(servicealias.service);
              done();        
            }
        })
      })     
   })
};
   

exports.create = function(req, res) { 

  var logOnly = req.query.logOnly;

  var updatedData = req.body;    
  var existingData = null;

  sql.SiteService.findAll({
    where: {
      site: updatedData.site
    }
  })
  .then(function(siteServices){
    existingData = _.map(siteServices,function(item){
      return item.service;
    });

    debug('Site:\t'+ updatedData.site);
    debug('Existing:\t'+ existingData);
    debug('Latest:\t'+updatedData.references);

    return standardizeServices(updatedData.references);
  }).then(function(standardized){    
                
        updatedData.references = standardized;
          
        var added = [];
        var unchanged;
        if(existingData.length!=0){
          added = _.difference(updatedData.references,existingData);
          unchanged = _.intersection(existingData,updatedData.references);
        }else {
          //This is a scenario in which it is a newly added site
          unchanged = updatedData.references;
        }
        var dropped = _.difference(existingData,updatedData.references);      

        if(added.length>0){
            debug('Services added\t'+ added);
        }
        if(dropped.length>0){
            debug('Services dropped\t'+ dropped);
        }
        if(unchanged.length>0){
            debug('Services unchanged\t'+ unchanged);
        }

        if(logOnly){
          return null;
        }else {

          return sql.sequelize.transaction(function(t){
          
            return P.join(
              insertChanges(updatedData.site,added,dropped),
              updateSiteService(updatedData.site,added,unchanged,dropped),
              deleteDrops(updatedData.site,dropped)
              // uploadLoadTime(updatedData.site,updatedData.loadTime);
              );
            }).then(function(){
                console.log('committed');
            })
        }
  
  }).then(function(st){    
    res.status(200).send();
    return null;
  })
  
  // Siteservice.createAsync(req.body)
  //   .then(responseWithResult(res, 201))
  //   .catch(handleError(res));
};


