"use strict";
const responseSender = require("../../util/responseSender.js");
const errorHandler = require("../../util/errorHandler.js");
const walletService = require("./wallet.service.js");
const constants = require("../../constants/index.js");
const errorCodes = constants.errorCodes;
const successCodes = constants.successCodes;


async function addMoneyToWallet(req, res) {
    
    var wallet = req.body;
        var data={
        "country":"IND",
        "telphone":901089500,
        "payment_currency":"INR",
        //"payment_amount":3000,
        "payment_reference":"CREDIT"
    }
    var user_created =req.user._id;
    var user_id= req.user._id;
    var user_type_id=req.user.userTypeId;
    //var user_created=310;
    try {
        var result = await walletService.addMoneyToWallet(user_id, data.country, data.telphone, 
            user_type_id, data.payment_currency, wallet.payment_amount,data.payment_reference, user_created);
        responseSender(req, res, result);
    }
    catch (err) {
        errorHandler(req, res, { msg: "Unknown error" }, 500);
    }
}
async function getMoneyFromWallet(req, res) {
    
    var user_id = req.user._id;
    try {
        var result = await walletService.getMoneyFromWallet(user_id);
        responseSender(req, res, result);
    }
    catch (err) {
        errorHandler(req, res, { msg: "Unknown error" }, 500);
    }
}

  async function getTransactionDetail(req, res) {
      var user_id = req.user._id;
    var data = await walletService.getTransactionDetail(null, user_id);
    responseSender(req, res, data);
}

module.exports = { addMoneyToWallet,getMoneyFromWallet, getTransactionDetail }