'use strict';

var express = require('express');
var controller = require('./stat.controller');

var router = express.Router();


router.get('/services/mostpopular', controller.queryMostPopularServices);
router.get('/services', controller.querySiteServices);
router.get('/sites', controller.queryServiceSites);
router.get('/summary', controller.querySummary);

// router.get('/', controller.index);
// router.get('/:id', controller.show);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;
