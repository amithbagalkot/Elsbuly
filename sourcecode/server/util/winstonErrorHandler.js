const winston = require('winston');
const responseSender = require("./responseSender");


module.exports = function (err, req, res, next) {
	console.log('default middleware function for errorHandling');
	winston.error(err.message);
	let data = err.msg;
	console.log(data);
	var statusCode = statusCode || 400
	res.status(statusCode).send({
		data: data,
		meta: {
			message: data,
			statusCode: statusCode
		}
	});
}