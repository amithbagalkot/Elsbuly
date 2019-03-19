const pushDbAction = require('./pushNotification.DbAction');
const db = require('../../../models');

async function addUsertNotificationSubscription(req, res, next) {
    const options = req.body;
    const user_id = req.user._id;
    const userTypeId = req.user.userTypeId;
    var endpoint, expirationTime;
    var keys = {};
    ({ endpoint, expirationTime, keys } = options);
    const resultsub = await pushDbAction.addUsertNotificationSubscription(user_id, userTypeId, endpoint, expirationTime, keys);
    return resultsub;
};

async function checkSubscription(user_id) {
    const checkSubscription = await pushDbAction.checkSubscription(user_id);
    return checkSubscription;
}

async function getUsertNotificationSubscription(user_id) {
    const resultGetSub = await pushDbAction.getUsertNotificationSubscription(user_id);
     return resultGetSub;
}

module.exports = {
    addUsertNotificationSubscription,
    checkSubscription,
    getUsertNotificationSubscription
};