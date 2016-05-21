/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/servicealiases              ->  index
 * POST    /api/servicealiases              ->  create
 * GET     /api/servicealiases/:id          ->  show
 * PUT     /api/servicealiases/:id          ->  update
 * DELETE  /api/servicealiases/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var urlUtil = require('url');

import config from '../../config/environment';

var sql = require('../../sql');



// function handleError(res, statusCode) {
//   statusCode = statusCode || 500;
//   return function(err) {
//     res.status(statusCode).send(err);
//   };
// }

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

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

// Gets a list of Servicealiass
exports.index = function(req, res) {  
   sql.ServiceAlias.findAll().then(responseWithResult(res));    
};

// Gets a single Servicealias from the DB
// exports.show = function(req, res) {
//   Servicealias.findByIdAsync(req.params.id)
//     .then(handleEntityNotFound(res))
//     .then(responseWithResult(res))
//     .catch(handleError(res));
// };

//Creates a new Servicealias in the DB
exports.create = function(req, res) {
  sql.ServiceAlias.create({
      key: req.body.service + req.body.alias,
      service: req.body.service,
      alias: req.body.alias    
    }).then(function(record){
      console.log('here');
      //responseWithResult(record);
      res.status(200).json(record);
  })
};

// Updates an existing Servicealias in the DB
// exports.update = function(req, res) {
//   if (req.body._id) {
//     delete req.body._id;
//   }
//   Servicealias.findByIdAsync(req.params.id)
//     .then(handleEntityNotFound(res))
//     .then(saveUpdates(req.body))
//     .then(responseWithResult(res))
//     .catch(handleError(res));
// };

// Deletes a Servicealias from the DB
exports.destroy = function(req, res) {
   sql.ServiceAlias.findById(req.params.id).then(record => {
    record.destroy().then(function(){            
      return null;
    });
    return null;
  }).then(function(){
      res.status(200).send();
  })

};
