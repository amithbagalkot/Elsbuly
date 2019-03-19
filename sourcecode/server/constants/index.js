const successCodes = {
    SUCCESS_USER_CREATED:{
        code:"SUCCESS_USER_CREATED",
        message:"Account Created Successfully! Please check your e-mail for activation link.",
    },
    SUCCESS_REGISTERED:{
        code:"SUCCESS_REGISTERED",
        message:"Registered Successfully",
    },
    SUCCESS_IDEA_CREATED:{
        code:"SUCCESS_IDEA_REGISTERED",
        message:"Idea Created Successfuly"
    },
    SUCCESS_IMAGE_UPLOADED:{
        code: "SUCCESS_IMAGE_UPLOADED",
        message:"Image uploaded successfuly"
    },
    SUCCESS_USER_UPDATED: {
        code: "SUCCESS_USER_UPDATED",
        message: "Your Details Uploaded Successfully"
    },
    SUCCESS_PREFERENCES_CREATED: {
        code: "SUCCESS_PREFERENCE_CREATED",
        message: "Preferences Created Successfully"
    },
    SUCCESS_MOBILE_NUMBER_CREATED: {
        code: "SUCCESS_MOBILE_NUMBER_CREATED",
        message: "Mobile Number Created Successfully"
    },
    SUCCESS_OTP_CREATED: {
        code: "SUCCESS_OTP_CREATED",
        message: "OTP Created and Sent to Mobile Number"
    }
}

const errorCodes = {
    "ERR_INVALID_PASSWORD":{
        code:"ERR_INVALID_PASSWORD",
        message:"Password is invalid"
    },
    "ERR_INVALID_USER_OR_PASSWORD":{
        code:"ERR_INVALID_USER_OR_PASSWORD",
        message:"Email or password is wrong"
    },
    "ERR_USER_NOT_EXIST":{
        code:"ERR_USER_NOT_EXIST",
        message:"User doesnot exists"
    },
    "ERR_USER_NOT_EXIST":{
        code:"ERR_USER_NOT_EXIST",
        message:"User doesnot exists"
    },
    "ERR_USER_CREATE":{
        code:"ERR_USER_CREATE",
        message:"Error in Creating User"
    },
    "ERR_SESSION_EXPIRED":{
        code:"ERR_SESSION_EXPIRED",
        message:"Session has expired , Please login again"
    },
    "ERR_MOBILE_NUMBER_EXIST": {
        code: "MOBILE_NUMBER_EXIST",
        message: "Mobile Number is already existed"
    },
    "ERR_OTP_CREATION_FALIED": {
        code: "OTP_CREATION_FALIED",
        message: "OTP creation Failed"
    },
    "ERR_UNKNOWN":{
        code:"ERR_UNKNOWN",
        message:"Unknown error occured"
    },
    "ERR_LOGIN":{
        code: "ERR_NEWUSER_LOGIN",
        message: "Please verify your email-id to login"
    }

}


module.exports = {
    successCodes,
    errorCodes
}
