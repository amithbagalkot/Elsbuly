var advisordbaction = require('./advisor.dbaction');

async function getAdviosrs(user_type_id) {
    return await advisordbaction.getAdviosrs(user_type_id);
}
async function getAdvisorTraders(advisor_id) {
    return await advisordbaction.getAdvisorTraders(advisor_id);
}
module.exports = { getAdviosrs, getAdvisorTraders }