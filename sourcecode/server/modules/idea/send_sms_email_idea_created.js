const ideadbaction = require("./idea.dbaction");
var advisorservice = require('../advisor/advisor.service.js');
const traderService = require('../trader/trader.service');
var walletService = require('../wallet/wallet.service');
var sendEmail = require('../communication/email/email');
var sendSms = require('../communication/sms/sendSms');
var deductAmount = require('../wallet/wallet.service');
var ideaTraderDetailService = require('../trader/trader.service');
var util = require('../../util/util');
var traderController = require('../trader/trader.controller');

async function getTraders(advisorId,idea_price, advisorTelephone) {
    var traders = await advisorservice.getAdvisorTraders(advisorId);
  
    for (var i = 0; i < traders.length; i++) {
        var trader_emailId = traders[i].traderEmail;
        var trader_telephone = traders[i].telephone;
        var trader_id = traders[i].trader_id;
        getTraderBal(trader_id, trader_emailId,idea_price, advisorId, trader_telephone, advisorTelephone);
        var adviosrs = await traderService.getAdvisorList(traders[i].trader_id);
    }
}
async function getTraderBal(traderId, trader_emailId,idea_price, advisorId, trader_telephone, advisorTelephone) {
    var date_created=await util.getDate();
    var trader_wallet = await walletService.getMoneyFromWallet(traderId);
    var getIdeasDetails = await ideadbaction.getIdea(null, advisorId); 
    for (var i = 0; i < trader_wallet.length; i++) {
        var trader_walletBal = trader_wallet[i].payment_amount;
        if (trader_walletBal >= idea_price) {
             var ideaTraderDetail = await ideaTraderDetailService.ideaPush(getIdeasDetails[0].idea_id,traderId, getIdeasDetails[0].idea_string,  trader_telephone, date_created, date_created, date_created);
            var transaction_detail = await walletService.addTraderLedger(traderId, 1, 'DEBIT', date_created, idea_price, date_created, date_created );
        
            sendEmail.IdeasEmailTrader(trader_emailId, 'advisorname', function (err, response) {
                if (err) {
                    console.log( err);
                } else {
                    console.log("ERROR");
                }
            })
          //  sendSms.sendIdeaSms()  // have to pass the mobile number
        }
    }
}
module.exports={getTraders}