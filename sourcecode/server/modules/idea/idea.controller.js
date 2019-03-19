var errorHandler = require("../../util/errorHandler");
var responseSender = require("../../util/responseSender");
// const email = require("../communication/email/email");
const ideaService = require("./idea.service");
const pushNotificationService = require('../communication/pushNotification/pushNotification.service');
const sendNotification = require('../communication/pushNotification/sendPushNotification');
const advisorService = require('../advisor/advisor.service.js');
var userDbAction = require("../user/user.dbaction");
const preferenceGet = require("../preferences/preference.service");
const reqEmail = require('./send_sms_email_idea_created');
const ideaDbAction = require('./idea.dbaction');
const traderController = require('../trader/trader.controller');
const walletService = require('../wallet/wallet.service.js');
const util = require('../../util/util');


async function createIdea(req, res) {

        var advisorId = req.user._id;
        var telephone = req.user.telephone;
        var ideaObject = req.body;
        var idea_price = req.body.data.price_at_idea_open;
        ideaObject.user_created = req.user._id;
        ideaObject.advisor_id = req.user._id;
        ideaObject.user_updated = req.user._id;
        reqEmail.getTraders(advisorId, idea_price, telephone);
        var data = await ideaService.createIdea(ideaObject);
        const traderDetails = await advisorService.getAdvisorTraders(advisorId);
        addIdeaBoard(advisorId, telephone, idea_price);
        // traderDetails.forEach(traderDetail => {
        //         getPreferences(traderDetail.trader_id);
        // });
        return responseSender(req, res, data);
}
async function addIdeaBoard(advisorId, telephone, idea_price) {
        var date_created=await util.getDate();
                var getIdeasDetails = await ideaDbAction.getIdea(null, advisorId);
                traderController.addIdeaBoard(getIdeasDetails[0].idea_id, telephone);
                var transaction_detail = await walletService.addAdvisorLedger(advisorId, 1, 'CREDIT', date_created, idea_price, date_created, date_created );
        
}
async function getPreferences(user_id) {
       // var preferencesGet = await preferenceGet.getPreferences(user_id);
        // if ( preferencesGet[0].push_notification === 1 && preferencesGet === 1 ) {
        // }
              //  pushNotificationRequest(user_id);
        
}
// async function pushNotificationRequest(user_id) {
//         var subscriptiondedetails = await pushNotificationService.getUsertNotificationSubscription(user_id);
//         if (subscriptiondedetails !== "USER IS NOT SUBSCRIBED") {
//                 const data = {
//                         title: 'New Idea!',
//                         body: 'New Idea has Been Posted',
//                         click_action: 'https://dev.elsbuly.com/'
//                 };
//                 const sendNOtification = await sendNotification.IdeaNotification(subscriptiondedetails, data);
//         };
// };

async function updateIdea(req, res) {
        var ideaObject = req.body;
        var data = await ideaService.updateIdea(ideaObject)
        responseSender(req, res, data);
}
async function getIdea(req, res) {
        var ideaId = req.params.ideaId
        var data = await ideaService.getIdea(ideaId);
        return responseSender(req, res, data);
}

async function getIdeas(req, res) {
        var userTypeId = req.user.userTypeId;
        var advisor_id = req.user._id;
        if(userTypeId === 30103) {
                advisor_id = null
        }
        var data = await ideaService.getIdeas(null, advisor_id);
        return responseSender(req, res, data);
}
async function createPushIdea(req, res) {
        var pushIdeaObject = req.body;
        var data = await ideaService.createPushIdea(pushIdeaObject)
        return responseSender(req, res, data);
}
// update is same as create for now.
async function updatePushIdea(req, res) {
        var pushIdeaObject = req.body;
        var data = await ideaService.updatePushIdea(pushIdeaObject)
        return responseSender(req, res, data);
}
async function getPushIdea(req, res) {
        var ideaId, ideaPushId, traderId;
        ({ ideaId, ideaPushId, traderId } = req.query);
        var data = await ideaService.getPushIdea(ideaId, ideaPushId, traderId)
        return responseSender(req, res, data);
}

async function getPushIdea(req, res) {
        var ideaId, ideaPushId, traderId;
        ({ ideaId, ideaPushId, traderId } = req.query);
        var data = await ideaService.getPushIdea(ideaId, ideaPushId, traderId)
        return responseSender(req, res, data);
}

async function createIdeaRating(req, res) {
        var data = req.body;
        var result = await ideaService.createIdeaRating(data.ideaId, data.traderId, data.ideaRating, data.ideaRatingNote, req.user._id, req.user._id)
        return responseSender(req, res, result);
}

async function getIdeaRating(req, res) {
        var ideaId, ideaPushId, traderId;
        ({ ideaRatingId, ideaId } = req.params);
        var data = await ideaService.getIdeaRatings(ideaRatingId, ideaId)
        return responseSender(req, res, data);
}

async function getIdeaRatings(req, res) {
        var ideaId, ideaPushId, traderId;
        ({ ideaId } = req.params);
        var data = await ideaService.getIdeaRatings(ideaId)
        return responseSender(req, res, data);
}

module.exports = {
        createIdea,
        updateIdea,
        getIdea,
        getIdeas,
        createPushIdea,
        updatePushIdea,
        getPushIdea,
        getIdeaRatings,
        getIdeaRating,
        createIdeaRating
}
