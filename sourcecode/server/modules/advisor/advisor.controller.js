var errorHandler = require("../../util/errorHandler");
var responseSender = require("../../util/responseSender");
var advisorservice = require('./advisor.service');

async function getAdviosrs(req, res) {
  var user_type_id =  30102;
  var data = await advisorservice.getAdviosrs(user_type_id);
  if (data) {
    return responseSender(req, res, data);
  }
  else {
   return errorHandler(req, res, { msg: "Unknown error" }, 500);
  }
}
async function getAdvisorTraders(req, res) {
  var advisor_id = req.user._id;
  var data = await advisorservice.getAdvisorTraders(advisor_id);
  if (data) {
    return responseSender(req, res, data);
  }
  else {
   return errorHandler(req, res, { msg: "Unknown error" }, 500);
  }
}
module.exports = { getAdviosrs, getAdvisorTraders }