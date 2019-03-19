var userDbAction = require("./user.dbaction.js");
const util = require("../../util/util.js");
const jwt = require('jsonwebtoken');
const config = require('../../config');
const sendToken = require('../../modules/communication/email/email');

async function createMobileNumber(mobileNumber) {
  return userDbAction.createMobileNumber(mobileNumber);
}
async function createOtp(mobilenumber, countryId,  otpCode, counterOtp){
  var date_created=await util.getDate();
  return userDbAction.createOtp(mobilenumber, countryId, otpCode, counterOtp, date_created, date_created, date_created, date_created);
}
async function resendOtp(mobilenumber, countryId,  otpCode, counterOtp){
  var date_created = await util.getDate();
  return userDbAction.resendOtp(mobilenumber, countryId, otpCode, counterOtp, date_created, date_created, date_created, date_created);
}
async function verifyMobilenumber(mobilenumber){
  return await userDbAction.verifyMobilenumber(mobilenumber);
}

async function verifyOtp(mobilenumber){
	return userDbAction.verifyOtp(mobilenumber);
}
async function getUserMenu(roleId){
	return userDbAction.getUserMenu(roleId);
}
async function createUser(user) {
  const emailVerifyToken = jwt.sign({ user:user.user_name},config.secrets.session,{ expiresIn: '24h' });
  // const emailVerifyToken = Math.random().toString(36).substring(7);
  sendToken.sendEmail(emailVerifyToken, user.email_id);

  var coutry_id, telephone, user_name, password, email_id, gender_id, user_type_id, user_source_code, idea_push_preference_id, user_updated, record_status_id;
  ({ coutry_id, telephone, user_name, password, email_id, gender_id, user_type_id, user_source_code, idea_push_preference_id, record_status_id } = user)
  var date = util.getDate();
  var otp_details = await userDbAction.verifyOtp(telephone);

  var otpCode = otp_details[0].otp_code
  var otpCounter = otp_details[0].otp_counter
  var otpSentDate = otp_details[0].otp_sent_date
  var otpResentDate = otp_details[0].otp_resent_date


  return await userDbAction.createUser(coutry_id, telephone, user_name, password,otpCode, otpCounter, otpSentDate,otpResentDate,   email_id, emailVerifyToken, gender_id, user_type_id, user_source_code, idea_push_preference_id, record_status_id, date);
}
async function updateUser(user, user_role_id) {
  var user_updated = user.user_id;
  
  var user_id, coutry_id, telephone, user_name, password, email_id, firstName, lastName, middleName, gender_id,  user_type_id, user_source_code, idea_push_preference_id, record_status_id;
  ({ user_id, coutry_id, telephone, user_name, password, email_id, firstName, lastName, middleName,date_of_birth, location,  gender_id,  user_type_id, user_source_code, idea_push_preference_id, record_status_id } = user)
  var date = util.getDate();
  var otp_details = await userDbAction.verifyOtp(telephone);

  var otpCode = otp_details[0].otp_code
  var otpCounter = otp_details[0].otp_counter
  var otpSentDate = otp_details[0].otp_sent_date
  var otpResentDate = otp_details[0].otp_resent_date
  return await userDbAction.updateUser(user_id,coutry_id, telephone, user_name, password, otpCode, otpCounter, otpSentDate,otpResentDate, email_id, firstName, lastName, middleName, date_of_birth, location,  gender_id,  user_type_id, user_source_code, user_role_id, idea_push_preference_id, record_status_id, user_updated);
}

async function uploadImage(user_id, image_name) {
  return await userDbAction.uploadImage(user_id, image_name) 
}

async function getImage(user_id) {
  return await userDbAction.getImage(user_id)
}

async function getUserMenu(roleId) {
  return userDbAction.getUserMenu(roleId);
}


module.exports = {
  createUser,
  updateUser,
  uploadImage,
  getImage,
  getUserMenu,
  createMobileNumber,
  createOtp,
  resendOtp,
  verifyOtp,
  verifyMobilenumber
}