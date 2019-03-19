'use strict';

var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');

var config = require('../../config');
var validateJwt = expressJwt({ secret: config.secrets.session });

/**
 * Attach the user object to the request if authenticated
 * Otherwise returns 403
 */
exports.isAuthenticated = function () {
  return compose()
    .use(validateJwt)
    .use(function (req, res, next) {
      next();
    });
};


/**
 * Returns a jwt token, signed by the app secret
 */
exports.signToken = function (obj) {

  return jwt.sign(
    obj,
    config.secrets.session,
    { expiresIn: 60 * 60 * 5 }
  );

};

exports.validate = function(token){
    try{
        var decoded = jwt.verify(token,config.secrets.session);
        return decoded;
    }
    catch(e){
        return null;
    }
};