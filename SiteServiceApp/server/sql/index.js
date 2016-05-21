/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/siteservices              ->  index
 * POST    /api/siteservices              ->  create
 * GET     /api/siteservices/:id          ->  show
 * PUT     /api/siteservices/:id          ->  update
 * DELETE  /api/siteservices/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
import config from '../config/environment';

var Sequelize = require('sequelize');

var sequelize = new Sequelize(config.database.name, config.database.user, config.database.password, {
  host: config.database.host,
  dialect: config.database.dialect,
  logging: true,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

var SiteService = sequelize.define('siteservice', {
  key: {
    type: Sequelize.STRING,
    unique: true
  },
  site: {
    type: Sequelize.STRING    
  },
  service: {
    type: Sequelize.STRING
  },
   verifiedAt: {
    type: Sequelize.DATE
   },
   dropCount: {
    type: Sequelize.INTEGER
   }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

SiteService.sync({force: false}).then(function () {
  console.log('SiteService table created');
  // // Table created
  // return User.create({
  //   firstName: 'John',
  //   lastName: 'Hancock'
  // });
});

var Site = sequelize.define('site', {
  site: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  loadTime: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

Site.sync({force: false}).then(function () {
  console.log('Site table created');
  // // Table created
  // return User.create({
  //   firstName: 'John',
  //   lastName: 'Hancock'
  // });
});

var ServiceAlias = sequelize.define('service_alias', {
   key: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  service: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  alias: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

ServiceAlias.sync({force: false}).then(function () {
  console.log('ServiceAlias table created');
  // // Table created
  // return User.create({
  //   firstName: 'John',
  //   lastName: 'Hancock'
  // });
});


var SiteServiceChange = sequelize.define('siteservice_change', {
  site: {
    type: Sequelize.STRING,
    allowNull: false    
  },
  service: {
    type: Sequelize.STRING,
    allowNull: false    
  },
  operation: {
    type: Sequelize.STRING,
    allowNull: false    
  },
  changeDate: {
    type: Sequelize.DATE,
    allowNull: false    
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

SiteServiceChange.sync({force: false}).then(function () {
  console.log('SiteService_Change table created');  
});


exports.sequelize = sequelize;
exports.Site = Site;
exports.SiteService = SiteService;
exports.SiteServiceChange = SiteServiceChange;
exports.ServiceAlias = ServiceAlias;
