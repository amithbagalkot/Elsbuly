"use strict";

const fs = require("fs");
var multer = require('multer');
const responseSender = require("../../util/responseSender.js");
const errorHandler = require("../../util/errorHandler.js");
const userService = require("./user.service.js");
const constants = require("../../constants/index.js");
const errorCodes = constants.errorCodes;
const successCodes = constants.successCodes;
const communication = require('../communication/sms/sendSms');
const util = require("../../util/util.js");
const sendEmail = require('../communication/email/email');

async function verifyMobilenumber(mobilenumber) {
  var result = await userService.verifyMobilenumber(mobilenumber);
  return result[0]['@result'];
}

async function createOtp(req, res) {

  // null, mobile_number, country_id, otp_code, counter_otp, otp_sent_date, otp_resent_date,
  //record_status_id, date_creted,   user, date_upated, user
  var mobilenumber = req.body.mobilenumber;
  var countryId  = req.body.countryCode;
   var mob_number = mobilenumber.split('+');
  var counterOtp = 1;

  console.log(countryId);
   // use mobile_verification table for otp and mobile verification.

   var result = await userService.verifyMobilenumber(mobilenumber);

 //  const mobile_upi = await userService.createMobileNumber(mob_number[1]);
 
 var result1= result[0]['@result'];
  if(result1 === 1) {
    return responseSender(req, res, constants.errorCodes.ERR_MOBILE_NUMBER_EXIST);
  }

  if(result1 === -1) {
    const otpCode = Math.floor(10000 + Math.random()*900000);
 // (mobilenumber, countryId, otpCode, counterOtp, date_created, date_created, date_created, date_created);
    const result = await userService.createOtp(mobilenumber, countryId,  otpCode, counterOtp);
   // const OTP_result = communication.sendOtp(mobilenumber, otp)
    responseSender(req, res,  constants.successCodes.SUCCESS_OTP_CREATED);
  }
}

async function resendOtp(req, res) {
  var mobilenumber = req.body.mobilenumber;
  var countryId  = req.body.countryCode;
  // var mobilenumber = req.body.mobilenumber;
  var otpCode = Math.floor(100000 + Math.random() * 900000);
  var counterOtp = 1;
  try {
    counterOtp += 1;
    console.log(counterOtp);
 //   var to_mobilenumber_otp = communication.sendOtp(mobilenumber, otp)
    var result = await userService.resendOtp(mobilenumber, countryId,  otpCode, counterOtp);
    responseSender(req, res, "otp created sent to mobilenumber");
  }
  catch (error) {
    errorHandler(req, res, { msg: "Unknown error" }, 500);
  }
}

async function verifyOtp(req, res) {    //  get otp and verify orp 
  var now = new Date();

  var client_otp = req.body.otp;
  var mobilenumber = req.body.mobilenumber;

  try {
    var data = await userService.verifyOtp(mobilenumber);
    var db_otp = data[0].otp_code;

    if (data[0].hasOwnProperty("otp_sent_date")) {
      var db_otp_date_time = data[0].otp_sent_date;
    } else {
      var db_otp_date_time = data[0].date_resent_date;
    }

    db_otp_date_time.setMinutes(db_otp_date_time.getMinutes() - 330);


    var diff = Math.abs(now - db_otp_date_time); // milliseconds
    var diff_time_min = util.millisToMinutesAndSeconds(diff);
    if (client_otp == db_otp) {
        responseSender(req, res, "otp_matched");
    } 
    else {
      errorHandler(req, res, { msg: "otp is not matched" })
    }
  } catch (err) {
    errorHandler(req, res, { msg: "something went please check once again " }, 500);
  }
}


async function emailVerification() {
  var email = req.body.email;

  try {

  }
  catch (error) {

  }
}

function handleError(res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of User
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  fs.readFile("server/api/user/user.data.json", "utf-8", function (err, users) {
    if (err) {
      return handleError(res, err);
    }
    res.status(200).json(JSON.parse(users));
  });
};

/**
 * Get a single User
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  res.status(200).json({});
};

/**
 * Creates a new User in the DB.
 *
 * @param req
 * @param res
 */
async function create(req, res) {
  var user = req.body;
  var newUser = await userService.createUser(user);

  console.log(newUser);
  
  responseSender(req, res, newUser, 201, successCodes.SUCCESS_USER_CREATED);

};

/**
 * Updates an existing User in the DB.
 *
 * @param req
 * @param res
 */
async function update(req, res) {
  var user_role_id = req.user.roleId;
  var user = req.body;
  try {
    var updateUser = await userService.updateUser(user, user_role_id);
   return responseSender(req, res, updateUser, 201, successCodes.SUCCESS_USER_UPDATED);
  }
  catch (e) {
   return errorHandler(req, res, 'error', 400);
  }
};

async function uploadImage(req, res) {
  var userId = req.user._id;

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/images');
    },
    filename: function (req, file, cb) {
      if (!file.originalname.match(/\.(jpeg||jpg||png)$/)) {
        errorHandler(req, res, { msg: "Image type shpuld be jpeg, png, jpg" }, 500);
      }
      else {
        cb(null, file.originalname);
      }
    }
  });


  var upload = multer({
    storage: storage,

  }).single('profileImage');


  upload(req, res, (err) => {
    if (err) {
      if (err.code == 'fileType') {
        return errorHandler(req, res, { msg: "Image type shpuld be jpeg, png, jpg" }, 500);
      }
      else {
        return errorHandler(req, res, { msg: "Image uploading falied" }, 500);
      }
    };
    var image_name = req.file.originalname;
    uploadImageName(image_name);

  })
  async function uploadImageName(image_name) {
    try {
      var uploadImage = await userService.uploadImage(userId, image_name);
      if (!uploadImage) {
        var getImage = await userService.getImage(userId);
        if (getImage == undefined) {
          console.log('get_image is null');
        }
        console.log(getImage[0].image_name);
        return responseSender(req, res, getImage[0], 201, successCodes.SUCCESS_IMAGE_UPLOADED);
      }
    }
    catch (e) {
      console.log(e);
    }
  }
}
async function getImage(req, res) {
  var userId = req.user._id;
  var getImage = await userService.getImage(userId);
  if (getImage[0] === undefined) {
    return errorHandler(req, res, { msg: "Image not yet uploaded" }, 203);
  }
  else {
    console.log(getImage);
    return responseSender(req, res, getImage[0], 200);
  }
}
/**
 * Deletes a User from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  return res.status(204);
};

async function getUserMenu(req, res) {
  var user_type_id = req.user.userTypeId;
   var roleId = req.user.roleId;
  // var role_id = roleId.split(',')
  var menu = await userService.getUserMenu(roleId);
  responseSender(req, res, menu, 200)


};
var wallet = {}

exports.getWallet = async function (req, res) {
  var amount;
  if (wallet[req.user._id]) {
    amount = wallet[req.user._id];
  } else {
    amount = wallet[req.user._id] = 0;
  }
  var data = {
    amount: amount
  }
  responseSender(req, res, data, 200)
}

exports.addMoneyToWallet = async function (req, res) {
  var data = req.body;
  var amount = data.amount;
  var newAmount;
  if (wallet[req.user._id]) {
    newAmount = wallet[req.user._id] + amount;
    wallet[req.user._id] = newAmount;
  }
  else {
    newAmount = amount;
    wallet[req.user._id] = newAmount;
  }
  var data = {
    amount: newAmount
  }
  responseSender(req, res, data, 200)
}


module.exports = { create, update, uploadImage, getImage, createOtp, resendOtp, getUserMenu, verifyOtp, verifyMobilenumber }