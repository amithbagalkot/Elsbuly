'use strict';

const fs = require('fs');
const responseSender = require("../../util/responseSender.js")
const errorHandler = require("../../util/errorHandler.js")
const authService = require("./auth.service.js");
const constants = require("../../constants/index.js");
const errorCodes = constants.errorCodes;
const successCodes = constants.successCodes;

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of User
 *
 * @param req
 * @param res
 */
var validateToken = function (req, res) {
    var token = req.body.token;
    var valid = authService.validate(token);
    if(valid){
        return responseSender(req,res,{},200)
    }
    else
    {
        return errorHandler(req,res,errorCodes.ERR_SESSION_EXPIRED,401);
    }
};

module.exports = {
    validateToken
}
