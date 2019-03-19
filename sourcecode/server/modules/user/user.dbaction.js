var db = require("../../models");
const util = require("../../util/util.js");
var userDbAction = {};


async function createMobileNumber(mobileNumber) {
  const command = `CALL bs_mobilenumber_upi(${util.formatQueryData(mobileNumber)},@result)`;
  const result = await db.sequelize.query(command);
}
async function createOtp(mobilenumber, countryId, 
  otpCode, counterOtp, date_created, otpSentDate, otpSentDate, otpSentDate){
  var command =`CALL bs_mobile_verification_upi(null, ${util.formatQueryData(mobilenumber)},
  ${util.formatQueryData(countryId)},${util.formatQueryData(otpCode)}, ${util.formatQueryData(counterOtp)},
  ${util.formatQueryData(date_created)},${util.formatQueryData(date_created)},
  null,  ${util.formatQueryData(date_created)}, null,  null, null )`;
  var createOtp=await db.sequelize.query(command);
  return createOtp;
}

async function resendOtp(mobilenumber, countryId, 
  otpCode, counterOtp, date_created, otpSentDate, date_updated, date_updated){
    var command = `CALL bs_mobile_verification_upi(null, ${util.formatQueryData(mobilenumber)},
  ${util.formatQueryData(countryId)},${util.formatQueryData(otpCode)}, ${util.formatQueryData(counterOtp)},
  ${util.formatQueryData(date_created)},${util.formatQueryData(date_created)},
  null,  ${util.formatQueryData(date_created)}, null,  ${util.formatQueryData(date_updated)}, null )`;
  var resendOtp=await db.sequelize.query(command);
  return resendOtp;
}

async function verifyOtp(mobilenumber){
  var command = `CALL bs_mobile_verification_get(${util.formatQueryData(mobilenumber)})`;
  var verifyOtp=await db.sequelize.query(command);
  return verifyOtp;
}
async function verifyMobilenumber(mobilenumber){
  var command  = `CALL bs_mobile_verification_check(${util.formatQueryData(mobilenumber)},@result)`;
  var verifyOtp=await db.sequelize.query(command);
  //var result   =await db.sequelize.query(`select @result`);
  var result   =await db.sequelize.query(`select @result`, {type: db.sequelize.QueryTypes.SELECT})
  return result;
}
async function createUser(country_id, telephone, user_name, password, otpCode, otpCounter, otpSentDate,otpResentDate,  email_id, emailVerifyToken, gender_id, user_type_id, user_source_code, idea_push_preference_id, record_status_id, user_updated) {
    var command = `CALL bs_user_upi(null,${util.formatQueryData(country_id)},null,
    ${util.formatQueryData(telephone)},${util.formatQueryData(user_name)},
    ${util.formatQueryData(password)}, null, null,null,
    ${util.formatQueryData(otpCode)},${util.formatQueryData(otpCounter)},null,null,${util.formatQueryData(email_id)},
     null, null, null, null, null,null,null,null,
    ${util.formatQueryData(gender_id)}, null,${util.formatQueryData(user_type_id)},
     ${util.formatQueryData(user_source_code)},null, null, null,null,null,
     ${util.formatQueryData(idea_push_preference_id)},null,null,null
      ,null,null, ${util.formatQueryData(emailVerifyToken)},@o_return_value)`;
  var createdUser = await db.sequelize.query(command);
  return createdUser;
}
async function findOne(token) {
  var findUser = await db.sequelize.query(`SELECT user_id FROM bs_user WHERE email_verification_token=${util.formatQueryData(token.token)}`);
  let user_id = findUser[0][0].user_id;
  var update = await db.sequelize.query(`UPDATE bs_user SET trader_status_id = 0, email_verification_token = null WHERE user_id=${user_id}`);
  return update;
}

async function updateUser(user_id, country_id, telephone, user_name, password, otpCode, otpCounter, otpSentDate,otpResentDate,  email_id, firstName, lastName, middleName, date_of_birth, location, gender_id, user_type_id, user_source_code, user_role_id, idea_push_preference_id, record_status_id, user_updated) {
  var command = `CALL bs_user_upi(${user_id},${util.formatQueryData(country_id)},
  ${util.formatQueryData(location)},${util.formatQueryData(telephone)},${util.formatQueryData(user_name)},
  ${util.formatQueryData(password)},null, null, null,null,null,
   null, null,  ${util.formatQueryData(email_id)},
  '${firstName}','${lastName}','${middleName}',null, null,null,null,null,
  ${util.formatQueryData(gender_id)},${util.formatQueryData(date_of_birth)},${util.formatQueryData(user_type_id)},
  '${user_source_code}',null, null, ${util.formatQueryData(user_role_id)},
  null,null,${util.formatQueryData(idea_push_preference_id)},null,null,${0},
  ${util.formatQueryData(record_status_id)},${util.formatQueryData(user_updated)}, null, @o_return_value)`;
  var updateUser = await db.sequelize.query(command);
  return updateUser;
}

async function getUser(userId) {
  var createdUser = await db.sequelize.query(
    `CALL bs_user_get(${user.first_name},
			${user.middle_name},${user.last_name}${user.email},${user.password},${user.phone})`)
  return createdUser;
}

async function uploadImage(user_id, image_name) {

  // profile_image has been deleted, insert the picture_file_name, display_picture_file_name ib bs_user_table

  // Needs to be change imediately.

  var command = `CALL bs_profile_image_upi(${util.formatQueryData(user_id)}, ${util.formatQueryData(image_name)},@o_return_value)`;
  var uploadImage = await db.sequelize.query(command);
  return uploadImage;
}
async function getImage(user_id) {
  var command = `CALL bs_profile_image_get(${util.formatQueryData(user_id)})`
  var getImage = await db.sequelize.query(command);
  return getImage;
}

async function getUserMenu(userRoleId) {
  var command = `CALL bs_menu_get(${util.formatQueryData(userRoleId)})`;
  var menu = await db.sequelize.query(command);
  return menu;

  // switch (userRoleId) {
  //   case 30102:
  //     return [

  //     {
  //       name: "Advisors",
  //       code: "ADVISORS"
  //     },
  //     {
  //       name: "Ideas",
  //       code: "IDEAS"
  //     },
      
  //     {
  //       name:"Subscriptions",
  //       code:"SUBSCRIPTIONS"
  //     },
  //     {
  //       name: "Wallet",
  //       code: "WALLET"
  //     },
  //     {
  //       name: "Discussions",
  //       code: "DISCUSSIONS"
  //     },
  //     {
  //       name: "Ratings",
  //       code: "RATINGS"
  //     },
  //     {
  //       name: "Profile",
  //       code: "PROFILE"
  //     },
  //     {
  //       name: "Preferences",
  //       code: "PREFERENCES"
  //     },
  //     {
  //       name:"Logout",
  //       code:"LOGOUT"
  //     }
  //   ]
  //     break;
  //   case 30101:
  //   	return [
        
  //     {
  //       name: "Generate",
  //       code: "GENERATE"
  //     },
  //     {
  //       name: "Ratings",
  //       code: "RATINGS"
  //     },
  //     {
  //       name: "Ideas",
  //       code: "IDEAS"
  //     },
  //     {
  //       name: "Performance",
  //       code: "PERFORMANCE"
  //     },
    
  //     {
  //       name: "Preferences",
  //       code: "PREFERENCES"
  //     },
   
  //     {
  //       name: "Profile",
  //       code: "PROFILE"
  //     },
  //     {
  //       name:"Logout",
  //       code:"LOGOUT"
  //     }
  //   ]
  //   default:
  //     return [
  //     // {
  //     //   name: "Preferences",
  //     //   code: "PREFERENCES"
  //     // },
  //     {
  //       name: "Ratings",
  //       code: "RATINGS"
  //     },
  //     {
  //       name: "Ideas",
  //       code: "IDEAS"
  //     },
  //     {
  //       name: "Performance",
  //       code: "PERFORMANCE"
  //     },
  //     {
  //       name: "Profile",
  //       code: "PROFILE"
  //     },
  //     {
  //       name: "Money",
  //       code: "MONEY"
  //     },
  //     {
  //       name:"Logout",
  //       code:"LOGOUT"
  //     }
  //   ]
  // }

}

module.exports = {
  findOne,
  createUser,
  updateUser,
  uploadImage,
  getImage,
  createMobileNumber,
  createOtp,
  resendOtp,
  verifyOtp,
  getUserMenu,
  verifyMobilenumber
}


//CALL bs_user_upi(null,10151,null,'9010089500','kranthi11@gmail.com','11','kranthi11@gmail.com',null,null,null,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoia3JhbnRoaTExQGdtYWlsLmNvbSIsImlhdCI6MTU0MjcyNTEwNywiZXhwIjoxNTQyODExNTA3fQ.2WYSF2VSydGYsSv6oSUPn3jlWJlVbKmzo8a8O4xtS-o',null,null, 10301, null,30101, 'ANDROID',null, null, null,null,null,70101,null,null,null, 10101,null,@o_return_value)