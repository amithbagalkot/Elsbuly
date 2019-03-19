const express = require('express');
const router = express.Router();
var auth = require("../../auth/auth.service");
const pushNotificationService = require('./pushNotification.service');
const asyncMiddleware= require('../../middleware/async');

router.post('/', auth.isAuthenticated(), asyncMiddleware(pushNotificationService.addUsertNotificationSubscription));

module.exports = router;
