/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/services              ->  index
 * POST    /api/services              ->  create
 * GET     /api/services/:id          ->  show
 * PUT     /api/services/:id          ->  update
 * DELETE  /api/services/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var urlUtil = require('url');
import config from '../../config/environment';

var sql = require('../../sql');


function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// function responseWithResult(res, statusCode) {
//   statusCode = statusCode || 200;
//   return function(entity) {
//     if (entity) {
//       res.status(statusCode).json(entity);
//     }
//   };
// }

// function handleEntityNotFound(res) {
//   return function(entity) {
//     if (!entity) {
//       res.status(404).end();
//       return null;
//     }
//     return entity;
//   };
// }

// function saveUpdates(updates) {
//   return function(entity) {
//     var updated = _.merge(entity, updates);
//     return updated.saveAsync()
//       .spread(function(updated) {
//         return updated;
//       });
//   };
// }

// function removeEntity(res) {
//   return function(entity) {
//     if (entity) {
//       return entity.removeAsync()
//         .then(function() {
//           res.status(204).end();
//         });
//     }
//   };
// }

var queryAll = "select distinct(service) from  siteservice;";

var queryByService = "select distinct(service) from  siteservice where service like ?";

var queryBySite = "select service from  siteservice where site=?;";

// Gets a list of Services
exports.index = function(req, res) {
  if(req.query.site){
    var url = urlUtil.parse(req.query.site);
    var host = url.host;    
    sql.sequelize.query(queryBySite, { replacements: [ host ],type: sql.sequelize.QueryTypes.SELECT}).then(function(entity){
       res.status(200).json(entity);      
    }).catch(handleError(res));  
  } else if(req.query.service){    
    sql.sequelize.query(queryByService, { replacements: [ '%'+req.query.service+'%' ],type: sql.sequelize.QueryTypes.SELECT}).then(function(entity){
       res.status(200).json(entity);      
    }).catch(handleError(res));  
  }else {
    sql.sequelize.query(queryAll, { type: sql.sequelize.QueryTypes.SELECT}).then(function(entity){
       res.status(200).json(entity);      
    }).catch(handleError(res));  
  }
};

// Gets a single Service from the DB
// exports.show = function(req, res) {
//   Service.findByIdAsync(req.params.id)
//     .then(handleEntityNotFound(res))
//     .then(responseWithResult(res))
//     .catch(handleError(res));
// };

// // Creates a new Service in the DB
// exports.create = function(req, res) {
//   Service.createAsync(req.body)
//     .then(responseWithResult(res, 201))
//     .catch(handleError(res));
// };

// // Updates an existing Service in the DB
// exports.update = function(req, res) {
//   if (req.body._id) {
//     delete req.body._id;
//   }
//   Service.findByIdAsync(req.params.id)
//     .then(handleEntityNotFound(res))
//     .then(saveUpdates(req.body))
//     .then(responseWithResult(res))
//     .catch(handleError(res));
// };

// // Deletes a Service from the DB
// exports.destroy = function(req, res) {
//   Service.findByIdAsync(req.params.id)
//     .then(handleEntityNotFound(res))
//     .then(removeEntity(res))
//     .catch(handleError(res));
// };
