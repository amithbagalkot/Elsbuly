'use strict';
const express = require('express');
const router = express.Router();
const auth = require("../auth/auth.service.js")
const controller = require('./wallet.controller');
const asyncMiddleware= require('../middleware/async');

router.post('/add',auth.isAuthenticated(), controller.addMoneyToWallet);

router.get('/',auth.isAuthenticated(), controller.getMoneyFromWallet);
router.get('/get_transaction', auth.isAuthenticated(), asyncMiddleware(controller.getTransactionDetail));

module.exports = router;