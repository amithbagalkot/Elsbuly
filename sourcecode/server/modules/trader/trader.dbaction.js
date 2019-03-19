var db = require("../../models");
const util = require("../../util/util.js");
var traderDbAction = {};

async function createSubscription(traderId,advisorId, currentrecordId,dateCreated,userCreated,dateUpdated,userUpdated) {
    var command = `CALL bs_trader_advisor_upi(null,
        ${util.formatQueryData(traderId)},${util.formatQueryData(advisorId)},
        ${util.formatQueryData(currentrecordId)}, null, ${util.formatQueryData(dateCreated)},
        ${util.formatQueryData(userCreated)},null,${util.formatQueryData(userUpdated)},
        @o_return_value)`;
    var data1 = await db.sequelize.query(command);
    if(data1 == undefined)
     {
        var data= await db.sequelize.query(`select @o_return_value`);
         return data;
     }
   // var data= await db.sequelize.query(`select @o_return_value`);
    // return data;
}

async function getSubscription(traderId,advisorId) {
    var command = `CALL bs_trader_advisor_get(null,${util.formatQueryData(traderId)},${util.formatQueryData(advisorId)})`;
    var subscriptions = await db.sequelize.query(command);
    return subscriptions;
}
async function cancelSubscription(traderId,advisorId,dateUpdated) {   
    var command = `CALL bs_trader_advisor_cancel(null,${util.formatQueryData(traderId)},${util.formatQueryData(advisorId)},${util.formatQueryData(dateUpdated)})`;
    var cancel_subscriptions = await db.sequelize.query(command);
    return cancel_subscriptions;
}
async function getIdeas(traderId) {
    var command = `CALL bs_idea_trader_get(null,null,${util.formatQueryData(traderId)})`;
    var ideas = await db.sequelize.query(command);
    return ideas;
}

async function getAdviosrIdeas(advisorId,traderId) {
    var command = `CALL bs_idea_trader_get(null,${util.formatQueryData(advisorId)},${util.formatQueryData(traderId)})`;
    var ideas = await db.sequelize.query(command);
    return ideas;
}

async function getCountry(countryCode) {
    var command = `select * from bs_country where country_id = ${countryCode}`;
    return await db.sequelize.query(command);
}
async function addIdeaBoard (ideaId, ideaBoardNumber, ideaBoardLimit, ideaBoardName, ideaBoardStatus, date) {
    var command = `CALL bs_idea_board_upi(null,${util.formatQueryData(ideaId)}, ${util.formatQueryData(ideaBoardNumber)},
    ${util.formatQueryData(ideaBoardLimit)}, ${util.formatQueryData(ideaBoardName)}, ${util.formatQueryData(ideaBoardStatus)},
    null,  ${util.formatQueryData(date)}, null, ${util.formatQueryData(date)}, null)`;
    var result = await db.sequelize.query(command);
    return result;
}

async function getIdeaBoard (ideaId) {
    var command = `CALL bs_idea_board_get(${util.formatQueryData(ideaId)})`;
    var result = await db.sequelize.query(command);
    return result;
}

async function getIdeaBoardTrader(ideaId, traderId) {
    var command = `CALL bs_idea_board_trader_get(${util.formatQueryData(ideaId)}, ${util.formatQueryData(traderId)})`;
    var result = await db.sequelize.query(command);
    return result;
}

async function addIdeaBoardTrader(ideaId, ideaBoard, traderId, date) {
    var command = `CALL bs_idea_board_trader_upi(null, ${util.formatQueryData(ideaId)}, 
    ${util.formatQueryData(ideaBoard)}, ${util.formatQueryData(traderId)}, 'LUCKY', null, ${util.formatQueryData(date)}, null,
    ${util.formatQueryData(date)}, null)`;
    var result = await db.sequelize.query(command);
    return result;
}

async function discussionJoin(userID, idea_id, userName,userEmail,discussion_board_type,discussion_board_id,dateCreated) {
    var command = `CALL bs_discussion_board(null,
        ${util.formatQueryData(userID)},${util.formatQueryData(idea_id)}, ${util.formatQueryData(userName)},
        ${util.formatQueryData(userEmail)},${util.formatQueryData(discussion_board_type)},
        ${util.formatQueryData(discussion_board_id)},${util.formatQueryData(dateCreated)})`;
    var data = await db.sequelize.query(command);
    return data;
}
async function discussionExit(userID, ideaId, ideaBoardId, date){
    var command = `CALL bs_idea_board_trader_upi(null, ${util.formatQueryData(ideaId)},
    ${util.formatQueryData(ideaBoardId)}, ${util.formatQueryData(userID)}, null, null, null, null,  ${util.formatQueryData(date)}, null)`;
    var data = await db.sequelize.query(command);
    return data;
}
async function getDiscussionUser(discussion_board_id, idea_id){
    var command = `CALL bs_discussion_user_get(${util.formatQueryData(discussion_board_id)}, ${util.formatQueryData(idea_id)})`;
    var data = await db.sequelize.query(command);
    return data;
}

async function getAdvisorList(traderId) {
    var command = `CALL bs_trader_advisor_get(null,${util.formatQueryData(traderId)}, null)`;
    var data = await db.sequelize.query(command);
    return data;
}
async function ideaPush(idea_id, traderId, ideaString,  telephone, date_created, date_created, date_created ) {
    var command = `CALL bs_idea_push_upi(null, ${util.formatQueryData(idea_id)}, 
    ${util.formatQueryData(traderId)},  ${util.formatQueryData(ideaString)},
    ${util.formatQueryData(telephone)}, 'Active',  ${util.formatQueryData(date_created)}, null, 
    ${util.formatQueryData(date_created)}, null,  ${util.formatQueryData(date_created)}, null)`;
    var data = await db.sequelize.query(command);
    return data;
}

module.exports = {
  createSubscription,
  getSubscription,
  getIdeas,
  getAdviosrIdeas,
  cancelSubscription,
  getCountry,
  addIdeaBoard,
  getIdeaBoard,
  addIdeaBoardTrader,
  getIdeaBoardTrader,
  discussionJoin,
  discussionExit,
  getDiscussionUser,
  getAdvisorList,
  ideaPush
}



