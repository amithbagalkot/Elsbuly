var request_service=require('../../../services/request_sender.service');
var db_mvaayo_auth = require('./sms.dbaction');

async function sendIdeaSms(){   // mobilenumber and advisor name and exchange name we get
 var data=await db_mvaayo_auth.mvaayo_auth();
 var username=data[0].username;
 var password=data[0].password;
 var text_sms = `advisor posted the new idea `;
 var url = 'http://api.mVaayoo.com/mvaayooapi/MessageCompose?user=' + username + ':' + password + '&senderID=TEST SMS&receipientno=' + 919542541903 + '&dcs=0&msgtxt=' + text_sms + '&state=4';
 var requestObj={
    url: url,
    method:'GET'
  }
         try{
          var result = await request_service.send(requestObj);
         }
         catch(error){
           console.log(error);
         }
  };

async function sendOtp(receipientno,otp){  // To mobilenumber 
  var data=await db_mvaayo_auth.mvaayo_auth();
  var username=data[0].username;
  var password=data[0].password;
  var text_sms = `${otp} is your verification code `;
  var url = 'http://api.mVaayoo.com/mvaayooapi/MessageCompose?user=' + username + ':' + password + '&senderID=TEST SMS&receipientno=' + receipientno + '&dcs=0&msgtxt=' + text_sms + '&state=4';
  var requestObj={
    url:url,
    method:'GET'
  }
  try{
    var res=await request_service.send(requestObj);
  }catch(error){
    console.log(error)
  }
}

module.exports={sendIdeaSms,sendOtp}  

