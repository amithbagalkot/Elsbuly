const preferenceService = require('./preference.service');
const responseSender = require('../../util/responseSender');
const constants = require("../../constants/index.js");
const successCodes = constants.successCodes;

async function createPreferences(req, res) {
    const user_id = req.user._id;
    const data = req.body;
    var dataResult = await preferenceService.createPreferences(user_id, data);
    responseSender(req, res, dataResult, 200, successCodes.SUCCESS_PREFERENCES_CREATED)

}
async function getPreferences(req, res) {
    const user_id = req.user._id;
    var dataResult = await preferenceService.getPreferences(user_id);
    responseSender(req, res, dataResult, 200, successCodes.SUCCESS_PREFERENCES_CREATED)
}

async function updatePreferences() {
    preferenceService.updatePreferences();
}

module.exports = {
    createPreferences,
    getPreferences,
    updatePreferences
}