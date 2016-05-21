/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/stats              ->  index
 * POST    /api/stats              ->  create
 * GET     /api/stats/:id          ->  show
 * PUT     /api/stats/:id          ->  update
 * DELETE  /api/stats/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Stat = require('./stat.model');

var urlUtil = require('url');

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

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

var query = 
  "with \
    site_stat as ( select count(*) site_count from site ),   \
    siteservice_stat as ( select service,count(*) count from siteservice group by service order by count desc) \
  select service, cast (count as FLOAT)*100/cast (site_count as FLOAT) percent from siteservice_stat join site_stat on 1=1 limit 40"
  ;
exports.queryMostPopularServices = function(req, res) {

  sql.sequelize.query(query, { type: sql.sequelize.QueryTypes.SELECT}).then(function(entity){
     res.status(200).json(entity);      
  }).catch(handleError(res));    
};



var querySiteService = 
  "with \
    site_stat as ( select count(*) site_count from site ), \
    siteservice_stat as ( select service,count(*) count from siteservice group by service order by count desc), \
    service_stat as ( select service, cast (count as FLOAT)*100/cast (site_count as FLOAT) percent from siteservice_stat join site_stat on 1=1) \
  select st.service, st.percent from siteservice ss join service_stat st on ss.service = st.service where site=? order by percent desc;"
  ;
exports.querySiteServices = function(req, res) {
  var url = urlUtil.parse(req.query.site);
  var host = url.host;  

  sql.sequelize.query(querySiteService, { replacements: [host], type: sql.sequelize.QueryTypes.SELECT}).then(function(entity){
     res.status(200).json(entity);      
  }).catch(handleError(res));    
};


var queryServiceSite = 
  "with \
    site_stat as ( select count(*) site_count from site ), \
    siteservice_stat as ( select service,count(*) count from siteservice group by service order by count desc), \
    service_stat as ( select service, cast (count as FLOAT)*100/cast (site_count as FLOAT) percent from siteservice_stat join site_stat on 1=1) \
  select st.service, st.percent from siteservice ss join service_stat st on ss.service = st.service where site=? order by percent desc;"
  ;
exports.queryServiceSites = function(req, res) {
  sql.sequelize.query(querySiteService, { replacements: [host], type: sql.sequelize.QueryTypes.SELECT}).then(function(entity){
     res.status(200).json(entity);      
  }).catch(handleError(res));    
};

var querySummary = 
  "with \
    site_stat as ( select count(*) site_count from site ), \
    service_stat as ( select count(distinct(service)) service_count from siteservice), \
    change_stat as ( select count(*) change_count from siteservice_change) \
    select site_count, service_count, change_count from site_stat join service_stat on 1=1 join change_stat on 1=1";

exports.querySummary = function(req, res) {
  sql.sequelize.query(querySummary, { type: sql.sequelize.QueryTypes.SELECT}).then(function(entity){
     res.status(200).json(entity);  
  }).catch(handleError(res));
};

// // Gets a list of Stats
// exports.index = function(req, res) {
//   Stat.findAsync()
//     .then(responseWithResult(res))
//     .catch(handleError(res));
// };

// // Gets a single Stat from the DB
// exports.show = function(req, res) {
//   Stat.findByIdAsync(req.params.id)
//     .then(handleEntityNotFound(res))
//     .then(responseWithResult(res))
//     .catch(handleError(res));
// };

// // Creates a new Stat in the DB
// exports.create = function(req, res) {
//   Stat.createAsync(req.body)
//     .then(responseWithResult(res, 201))
//     .catch(handleError(res));
// };

// // Updates an existing Stat in the DB
// exports.update = function(req, res) {
//   if (req.body._id) {
//     delete req.body._id;
//   }
//   Stat.findByIdAsync(req.params.id)
//     .then(handleEntityNotFound(res))
//     .then(saveUpdates(req.body))
//     .then(responseWithResult(res))
//     .catch(handleError(res));
// };

// // Deletes a Stat from the DB
// exports.destroy = function(req, res) {
//   Stat.findByIdAsync(req.params.id)
//     .then(handleEntityNotFound(res))
//     .then(removeEntity(res))
//     .catch(handleError(res));
// };
