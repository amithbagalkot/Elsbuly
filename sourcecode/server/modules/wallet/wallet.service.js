
const walletDbAction=require('./wallet.dbaction');

async function addMoneyToWallet(user_id,country,telphone,user_type_id,payment_currency,payment_amount,payment_reference,user_created){
  const date = new Date();
    const dateFormatted = date.toLocaleString(); // here date and time 
    const dateCreated  = dateFormatted;  
    const today = new Date();  
    const dd = today.getDate();  
    const mm = today.getMonth()+1;  
    const yyyy = today.getFullYear();
    // if(dd<10) {
    //     dd = '0'+dd
    //   } 

    // if(mm<10) {
    //   mm = '0'+mm
    // } 
    const payment_date=yyyy+ '-'+mm + '-' + dd ;  // only current date  
	return walletDbAction.addMoneyToWallet(user_id,country,telphone,user_type_id,payment_currency,payment_amount,payment_date,payment_reference,dateCreated,user_created )
}


async function getMoneyFromWallet(user_id){
    return await walletDbAction.getMoneyFromWallet(user_id)
}

async function deductAmount(user_id, idea_price) {
  return await walletDbAction.deductAmount(user_id, idea_price);
}

async function addTraderLedger(traderId, transactionTypeId, transactionRef, date_created, transactionAmount,  date_created, date_created) {
  
    return await walletDbAction.addTraderLedger(traderId, transactionTypeId, transactionRef, date_created, transactionAmount, date_created);
}

async function addAdvisorLedger(advisorId, transactionTypeId, transactionRef, date_created, transactionAmount,  date_created, date_created) {
    return await walletDbAction.addAdvisorLedger(advisorId, transactionTypeId, transactionRef, date_created, transactionAmount, date_created);
}

async function getTransactionDetail(payment_id, user_id) {
    return await walletDbAction.getTransactionDetail(payment_id, user_id);
}

module.exports={addMoneyToWallet,getMoneyFromWallet, deductAmount, addTraderLedger,addAdvisorLedger, getTransactionDetail}