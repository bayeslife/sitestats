/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

module.exports = function(app) {

  // Insert routes below
  app.use('/api/servicealiases', require('./api/servicealias'));
  app.use('/api/services', require('./api/service'));
  app.use('/api/stats', require('./api/stat'));
  app.use('/api/sites', require('./api/site'));
  app.use('/api/siteservices', require('./api/siteservice'));
  app.use('/api/vendors', require('./api/vendor'));
  app.use('/api/orgs', require('./api/org'));  
  app.use('/api/users', require('./api/user'));
  app.use('/api/things', require('./api/thing'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
