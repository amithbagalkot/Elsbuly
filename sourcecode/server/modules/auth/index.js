'use strict';

var express = require('express');
var router = express.Router();
var auth = require("./auth.service.js");
var authController = require("./auth.controller.js");
 require('./local/passport');

router.use('/local', require('./local'));
// router.post('/validate-token', authController.validateToken);

module.exports = router;
