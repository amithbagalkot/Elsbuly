function responseSender(req,res,data,statusCode,message)	{
	// update the response or send with appropriate header
    var statusCode = statusCode || 200
    res.status(statusCode).send({
    	data:data,
    	meta:{
    		message:message,
    		statusCode:statusCode
    	}
	});	
	console.log("it is done");
}

module.exports = responseSender;
