'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./advisor.controller');
var auth = require("../auth/auth.service");
const asyncMiddleware = require('../middleware/async');

router.get('/',auth.isAuthenticated(), asyncMiddleware(controller.getAdviosrs));
router.get('/traders',auth.isAuthenticated(), asyncMiddleware(controller.getAdvisorTraders));

// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;
