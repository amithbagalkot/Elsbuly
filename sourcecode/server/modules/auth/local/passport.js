"use strict";

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../../../models/");
var constants = require("../../../constants/index")
var successCodes = constants.successCodes;
var errorCodes = constants.errorCodes;
var authDbAction = require("../auth.dbactions");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async function (email, password, done) {
      try {
        var row = await authDbAction.authenticateUser(email, password);
        if (!row.user_id) {
          return done(errorCodes.ERR_INVALID_USER_OR_PASSWORD);
        }
        if (row.trader_status_id === null) {
          return done(errorCodes.ERR_LOGIN);
        }
        else {
          return done(null, row);
        }
      } catch (err) {
        return done(errorCodes.ERR_UNKNOWN);
      }
    }
  )
);