const db = require('../../../models');
const util = require('../../../util/util.js');

async function addUsertNotificationSubscription(user_id, userTypeId, endpoint, expirationTime, keys) {
    const command = `CALL bs_user_notification_subscription_upi(${util.formatQueryData(user_id)}, ${util.formatQueryData(userTypeId)}, null, ${util.formatQueryData(endpoint)}, ${util.formatQueryData(keys.p256dh)}, ${util.formatQueryData(keys.auth)}, @o_return_value)`;
    const userNotificationSubscriptionResult = await db.sequelize.query(command);
    
    const userOreturnValue = await db.sequelize.query(`SELECT @o_return_value`);
    return userOreturnValue;
};

async function getUsertNotificationSubscription(user_id) {
    const command = `CALL bs_user_notification_subscription_get(${util.formatQueryData(user_id)}, @o_return_value)`;
    const resultGetSub = await db.sequelize.query(command);
    if(resultGetSub === undefined) {
        var data = 'USER IS NOT SUBSCRIBED';
        // const data = await db.sequelize.query(`SELECT @o_return_value;`);
        return data;
    }
    else {
        return resultGetSub
    }
};

module.exports = {
    addUsertNotificationSubscription,
    getUsertNotificationSubscription
};