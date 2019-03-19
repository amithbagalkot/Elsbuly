'use strict';
var _ = require('lodash');
var express = require('express');
var passport = require('passport');
var errorHandler = require("../../../util/errorHandler");
var responseSender = require("../../../util/responseSender");
var auth = require('../auth.service');

var router = express.Router();

router.post('/', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) {
    return errorHandler(req, res,error, 401);
    }
    else {
        let data = {
          user: user,
          token: auth.signToken({_id: user.user_id, roleId: user.user_role_id, userTypeId: user.user_type_id, telephone:user.country_id, userName: user.first_name, email: user.email_id})
        };
        responseSender(req,res,data);
    }
  })(req, res);
});

module.exports = router;