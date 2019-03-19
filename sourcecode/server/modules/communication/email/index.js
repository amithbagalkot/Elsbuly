var express = require('express');
var router = express.Router();
var email=require('./email');
 var sms=require('../sms/sendSms.js');
 const verfiyEmail = require('../email/email');

 
router.post('/',email.SubscriptionEmailTrader);
router.post('/ideas',email.IdeasEmailTrader);
router.get('/sms',sms.sendIdeaSms);
router.get('/verify/:token', verfiyEmail.confirmEmail );
module.exports=router;