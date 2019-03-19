var db = require("../../models");
const util = require("../../util/util.js");

async function addMoneyToWallet(user_id,country,telphone,user_type_id,payment_currency,payment_amount,payment_date,payment_reference,dateCreated,user_created) {
    var command = `CALL bs_payment_upi(null,${util.formatQueryData(user_id)},
    ${util.formatQueryData(country)},${util.formatQueryData(telphone)},
    ${util.formatQueryData(user_type_id)},${util.formatQueryData(payment_currency)},
    ${util.formatQueryData(payment_amount)},${util.formatQueryData(payment_date)},${util.formatQueryData(payment_reference)},null,null,
    ${util.formatQueryData(dateCreated)},${util.formatQueryData(user_created)},null,null)`;
    var data = await db.sequelize.query(command);
    return data;
}  

async function getMoneyFromWallet(user_id){
    var command = `CALL bs_payment_get(null,${util.formatQueryData(user_id)})`;
    var data = await db.sequelize.query(command);
    return data;
}
async function deductAmount(user_id, idea_price) {
    const date = util.getDate();
    var command = `CALL bs_payment_deduct(null, ${util.formatQueryData(user_id)}, ${util.formatQueryData(idea_price)}, ${util.formatQueryData(date)})`;
    var data = await db.sequelize.query(command);
    return data;
}

async function addTraderLedger(traderId, transactionTypeId, transactionRef, 
    date_created, transactionAmount, date_created) {
    const date = util.getDate();
    var command = `CALL bs_trader_ledger_upi(null, 
        ${util.formatQueryData(traderId)}, null,  ${util.formatQueryData(transactionTypeId)}, 
        ${util.formatQueryData(transactionRef)}, ${util.formatQueryData(date_created)},
    null, ${util.formatQueryData(transactionAmount)}, null, null, null,  ${util.formatQueryData(date_created)}, null,
    ${util.formatQueryData(date_created)}, null)`;
    var data = await db.sequelize.query(command);
    return data;
}
async function addAdvisorLedger(advisorId, transactionTypeId, transactionRef, date_created, transactionAmount, date_created) {
        const date = util.getDate();
        var command = `CALL bs_advisor_ledger_upi(null, 
            ${util.formatQueryData(advisorId)}, null,  ${util.formatQueryData(transactionTypeId)}, 
            ${util.formatQueryData(transactionRef)}, ${util.formatQueryData(date_created)},
        null, ${util.formatQueryData(transactionAmount)}, null, null, null,  ${util.formatQueryData(date_created)}, null,
        ${util.formatQueryData(date_created)}, null)`;
        var data = await db.sequelize.query(command);
        return data;
}

async function getTransactionDetail(payment_id, user_id ) {
    var command = `CALL bs_trader_ledger_get(${util.formatQueryData(payment_id)}, ${util.formatQueryData(user_id)})`;
    var data = await db.sequelize.query(command);
    return data;
}

module.exports={addMoneyToWallet,getMoneyFromWallet, deductAmount, addTraderLedger, addAdvisorLedger, addAdvisorLedger, getTransactionDetail} 