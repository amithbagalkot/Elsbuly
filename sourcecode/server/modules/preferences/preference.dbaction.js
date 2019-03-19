const db = require('../../models/index');
const util = require('../../util/util');


 async function createPreferences(user_id, ideaPreferences, 
    advisorPreference, profilePreference, pushNotification, emailNotification, smsNotification) {
    command = `CALL bs_preference_upi(${util.formatQueryData(user_id)}, ${ideaPreferences}, ${advisorPreference}, ${profilePreference}, ${pushNotification}, ${emailNotification}, ${smsNotification})`;
    var data = await db.sequelize.query(command);
    return data;
}

 async function getPreferences(user_id) {
    command = `CALL bs_preference_get(${util.formatQueryData(user_id)})`;
    var data = await db.sequelize.query(command);
    return data;
}

 function updatePreferences() {

}

module.exports = {
    createPreferences,
    getPreferences,
    updatePreferences
}