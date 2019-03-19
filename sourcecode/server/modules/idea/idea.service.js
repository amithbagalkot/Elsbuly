var ideaDbAction = require("./idea.dbaction");
const util = require("../../util/util.js");
var send_sms_email=require('./send_sms_email_idea_created');
const pushNotificationService = require('../communication/pushNotification/pushNotification.service');
const sendNotification = require('../communication/pushNotification/sendPushNotification');
const advisorService = require('../advisor/advisor.service.js');

async function createIdea(ideaObject) {
    var advisor_id, idea_time, idea_string, script_id, script_name, exchange_id, exchange_code, instrument_id, instrument_code, base_script_code, country, idea_type, idea_status, idea_status_note, idea_strength, price_at_idea_open, start_range_price, end_range_price, price_target1, price_target2, price_target3, price_stoploss, trader_note, advisor_note, price_at_idea_close, dvisor_rating, advisor_rating_note, price_target1_hit, price_target1_hit_time, price_target2_hit, price_target2_hit_time, price_target3_hit, price_target3_hit_time, price_stoploss_hit, price_stoploss_hit_time, user_created, user_updated;
    ({ advisor_id, idea_time, idea_string, script_id, script_name, exchange_id, exchange_code, instrument_id, instrument_code, base_script_code, country, idea_type, idea_status, idea_status_note, idea_strength, price_at_idea_open, start_range_price, end_range_price, price_target1, price_target2, price_target3, price_stoploss, trader_note, advisor_note, price_at_idea_close, dvisor_rating, advisor_rating_note, price_target1_hit, price_target1_hit_time, price_target2_hit, price_target2_hit_time, price_target3_hit, price_target3_hit_time, price_stoploss_hit, price_stoploss_hit_time, user_created, user_updated } = ideaObject.data)
    var date = util.getDate();
    
    return await ideaDbAction.createIdea(advisor_id, date, idea_string, script_id, script_name, exchange_id, exchange_code, instrument_id, instrument_code, base_script_code, country, idea_type, idea_status, idea_status_note, idea_strength, price_at_idea_open, start_range_price, end_range_price, price_target1, price_target2, price_target3, price_stoploss, trader_note, advisor_note, price_at_idea_close, dvisor_rating, advisor_rating_note, price_target1_hit, price_target1_hit_time, price_target2_hit, price_target2_hit_time, price_target3_hit, price_target3_hit_time, price_stoploss_hit, price_stoploss_hit_time, 10101, date, user_created, date, user_updated);
}

async function updateIdea(ideaObject) {
    return ideaDbAction.updateIdea(ideaObject);
}

async function getIdea(ideaId, advisorId) {   
   return ideaDbAction.getIdea(ideaId);
}

async function getIdeas(ideaId = null, advisorId = null) {
   return ideaDbAction.getIdea(ideaId, advisorId);
}

async function createPushIdea(pushIdeaObject) {
    return ideaDbAction.createPushIdea(pushIdeaObject)

}
// update is same as create for now.
async function updatePushIdea(pushIdeaObject) {
    return ideaDbAction.updatePushIdea(pushIdeaObject)

}

async function getPushIdea(ideaId, ideaPushId, traderId) {
    return ideaDbAction.getPushIdea(ideaId, ideaPushId, traderId)
}

async function getIdeaRating(ideaRatingId, ideaId) {
    return ideaDbAction.getIdeaRating(ideaRatingId, ideaId, null)
}

async function getIdeaRatings(ideaId) {
    return ideaDbAction.getIdeaRating(null, ideaId, null)
}

async function createIdeaRating(ideaId, traderId, ideaRating, ideaRatingNote, userCreated, userUpdated) {
    var date = new Date();
    var dateFormatted = date.toLocaleString();
    var dateCreated = dateUpdated = dateFormatted;
    return ideaDbAction.createIdeaRating(ideaId, traderId, ideaRating, ideaRatingNote, 10101, dateCreated, userCreated, dateUpdated, userUpdated)
}


module.exports = {
    createIdea,
    updateIdea,
    getIdea,
    getIdeas,
    createPushIdea,
    updatePushIdea,
    getPushIdea,
    getIdeaRating,
    getIdeaRatings,
    createIdeaRating
}
