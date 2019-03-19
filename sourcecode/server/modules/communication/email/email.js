'use strict';
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var jade = require('jade');
var fs = require('fs');
const responseSender = require("../../../util/responseSender.js");
const errorHandler = require("../../../util/errorHandler.js");
var pino = require('pino')();
var credentials=require('./credentials.js');
var emailService=require('./emai.service');
const config = require('../../../config');
const jwt = require('jsonwebtoken');

const userDbAction = require('../../user/user.dbaction');

function SubscriptionEmailTrader(req, res) {   // this is not complete code 
    var template = process.cwd() + '/modules/communication/templates/subscription.jade';
    fs.readFile(template, 'utf8', (err, file) => {
        if (err) {
            pino.error('error at sending readfile  in email.js file ');
        }
        else {
            var compiledTmpl = jade.compile(file, { filename: template })
            var context = { advisorname: req.body.advisorname };
            var html = compiledTmpl(context);
            emailService.sendMail(req.body.advisoremail, 'Elsbuly', html, function (err, response) {
                if (err) {
                    pino.error('error at sending emails in email.js file ');
                    return res.status(401).send('ERROR');
                }
                pino.info("email sent successfully")
                var data = 'email sent'
              return  responseSender(req, res, data,200,'success')
            })
        }
    })
}

 function IdeasEmailTrader(email_id,advisorname) {
    var template = process.cwd() + '/modules/communication/templates/idea_trader.jade';
    fs.readFile(template, 'utf8', (err, file) => {
        if (err) {
            pino.error('error at sending readfile  in email.js file ');
        }
        else {
            var compiledTmpl = jade.compile(file, { filename: template })
            var context = { advisorname: advisorname };
            var html = compiledTmpl(context);
         return  emailService.sendMail(email_id, 'Elsbuly', html);
        }
    })
}
async function sendEmail(token, email) {
    var template = process.cwd() + '/modules/communication/templates/verify-email.jade';
    fs.readFile(template, 'utf8', (err, file) => {
        if (err) {
            pino.error('error at sending readfile  in email.js file ');
        }
        else {
            var compiledTmpl = jade.compile(file, { filename: template });
            var context = { token: token };
            var html = compiledTmpl(context);
            return emailService.sendMail(email, 'Elsbuly', html);
        }
    })
};

async function confirmEmail(req, res, next) {
    var token = req.params.token;

    console.log(token);
    const user = await userDbAction.findOne({'token': token});
    const decoded = jwt.verify(token, config.secrets.session);
    var data = 'your account has been successfull verified you may now login';
  return  responseSender(req, res, data, 200, 'success');
  
}
// async function emailVerification(email_id,token) {
//     console.log(email_id,token);
//     var template = process.cwd() + '/modules/communication/templates/idea_trader.jade';
//     fs.readFile(template, 'utf8', (err, file) => {
//         if (err) {
//             pino.error('error at sending readfile  in email.js file ');
//         }
//         else {
//             var compiledTmpl = jade.compile(file, { filename: template })
//             var context = { advisorname: advisorname };
//             var html = compiledTmpl(context);
//          return  emailService.sendMail(email_id, 'Elsbuly', html);
//         }
//     })
// }
module.exports = {confirmEmail, sendEmail, router, SubscriptionEmailTrader,IdeasEmailTrader };

