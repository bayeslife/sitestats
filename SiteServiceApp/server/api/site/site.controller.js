/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sites              ->  index
 * POST    /api/sites              ->  create
 * GET     /api/sites/:id          ->  show
 * PUT     /api/sites/:id          ->  update
 * DELETE  /api/sites/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var urlUtil = require('url');

import config from '../../config/environment';

var sql = require('../../sql');



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

// Gets a list of Sites
exports.index = function(req, res) {
  //console.log(req.params);  
  if(req.query.sitename!=null){
    sql.Site.findAll({
      limit: 10,
      where: {
        site: {
          $like: '%'+req.query.sitename+'%'
        }
      }
    }).then(responseWithResult(res));
  }else {
   sql.Site.findAll().then(responseWithResult(res));  
  }
};

// Gets a single Site from the DB
exports.show = function(req, res) {
  sql.Site.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Site in the DB
exports.create = function(req, res) {
  sql.Site.create({
    site: req.body.site,    
  }).then(function(record){
    //responseWithResult(record);
    res.status(200).json(record);
  })
};


// Updates an existing Site in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  sql.Site.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Site from the DB
exports.destroy = function(req, res) {
 sql.Site.findById(req.params.id).then(record => {
    record.destroy().then(function(){            
      return null;
    });
    return null;
  }).then(function(){
      res.status(200).send();
  })
 
};
