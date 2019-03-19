const db = require("../../../models/index.js");
const util = require("../../../util/util.js");


async function mvaayo_auth(){
    var command = `CALL bs_sms_api_auth(null, null)`;
    var data = await db.sequelize.query(command);
    return data
}
module.exports={
    mvaayo_auth
}