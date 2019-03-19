const winston = require('winston');
const responseSender = require("./responseSender");

module.exports = function errorHandler(req, res, errObj, statusCode) {
	console.log('cusotm errorHandler Function For errorHandler');
	winston.error(errObj);
	winston.error(errObj.message);
	// log error or do something
	responseSender(req, res, errObj, statusCode, "Error");
}