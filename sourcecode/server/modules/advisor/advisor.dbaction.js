var db = require("../../models");
const util = require("../../util/util.js");


async function getAdviosrs(user_type_id) {
    var command = `CALL bs_advisor_get(${util.formatQueryData(user_type_id)})`;
    var data = await db.sequelize.query(command);
    return data;
}
async function getAdvisorTraders(advisor_id) {
    var command = `CALL bs_advisor_trader_get(null,null,${util.formatQueryData(advisor_id)})`;
    var data = await db.sequelize.query(command);
    return data;
}
module.exports = { getAdviosrs, getAdvisorTraders }