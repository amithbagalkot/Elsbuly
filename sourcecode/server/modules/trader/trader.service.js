var traderDbActions = require("./trader.dbaction.js");
const util = require("../../util/util.js");
async function createSubscription(traderId,advisorId,userCreated,userUpdated){
	var date = new Date();
	var dateFormatted = date.toLocaleString();
	var dateCreated = dateUpdated = dateFormatted;

    return await traderDbActions.createSubscription(traderId,advisorId,10201,dateCreated,userCreated,dateUpdated,userUpdated)
}

async function cancelSubscription(traderId,advisorId){
	// var date = new Date();
	// var dateFormatted = date.toLocaleString();
    // var dateCreated = dateUpdated = dateFormatted;
      var dateUpdated=util.getDate();
    return traderDbActions.cancelSubscription(traderId,advisorId,dateUpdated)
}

async function getSubscription(traderId,advisorId){
    return traderDbActions.getSubscription(traderId,advisorId)
}

async function getIdeas(traderId){
    return traderDbActions.getIdeas(traderId)
}

async function getAdviosrIdeas(advisorId,traderId){
	
    return traderDbActions.getAdviosrIdeas(advisorId,traderId)
}

async function addIdeaBoard(ideaId, ideaBoardNumberr, ideaBoardNamee, ideaBoardTraderLimit) {
    // (ideaBoardObj, ideaBoardTraderLimit, ideaBoardNumber, ideaBoardName );
    var date = util.getDate();
    var ideaBoardStatus= 'active';
// ({ideaId, ideaBoardNumber, ideaBoardLimit, ideaBoardName, ideaBoardStatus} = ideaBoardObj);
 return traderDbActions.addIdeaBoard(ideaId, ideaBoardNumberr, ideaBoardTraderLimit, ideaBoardNamee, ideaBoardStatus, date);
}

async function getCountry(countryCode) {
    return traderDbActions.getCountry(countryCode);
}

async function getIdeaBoard(idea_id) {
    return traderDbActions.getIdeaBoard(idea_id);
}

async function getIdeaBoardTrader(ideaId,traderId) {
    return traderDbActions.getIdeaBoardTrader(ideaId, traderId);
}

async function addIdeaBoardTrader(ideaId, ideaBoard, traderId) {
    var date = util.getDate();
    return traderDbActions.addIdeaBoardTrader(ideaId, ideaBoard, traderId, date);
}


async function discussionJoin(userID, idea_id, userName,userEmail,discussion_board_type,discussion_board_id){
    var date = new Date();
	var dateFormatted = date.toLocaleString();
	var dateCreated= dateFormatted;
    return traderDbActions.discussionJoin(userID,idea_id, userName,userEmail,discussion_board_type,discussion_board_id,dateCreated)
}
async function discussionExit(userID, ideaId, ideaBoardId){
    var date = util.getDate();
    return traderDbActions.discussionExit(userID, ideaId, ideaBoardId, date);
}
async function getDiscussionUser(discussion_board_id, idea_id){
    return traderDbActions.getDiscussionUser(discussion_board_id, idea_id);
}

async function getAdvisorList(traderId) {
    return traderDbActions.getAdvisorList(traderId);
}
async function ideaPush(idea_id, traderId, ideaString, trader_telephone, date_created, date_created, date_created) {
     // null, idea_id, trader_id, idea_push_phone, idea_push_status, idea_push_date, 
         // record_status_id, date_created, user_created, date_updated, user_updated 
    return traderDbActions.ideaPush(idea_id, traderId, ideaString, trader_telephone, date_created, date_created, date_created );
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
  getIdeaBoardTrader,
  addIdeaBoardTrader,
  discussionJoin,
  discussionExit,
  getDiscussionUser,
  getAdvisorList,
  ideaPush

}