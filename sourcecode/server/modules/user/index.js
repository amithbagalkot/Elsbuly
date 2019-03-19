'use strict';

const express = require('express');
const router = express.Router();
const auth = require("../auth/auth.service.js")
const controller = require('./user.controller');
const asyncMiddleware= require('../middleware/async');
const compose = require('composable-middleware');

// router.get('/', controller.index);

router.get('/menu/',  auth.isAuthenticated(), asyncMiddleware(controller.getUserMenu));

// //router.get('/wallet',auth.isAuthenticated(), controller.getWallet);

// //router.post('/wallet/add',auth.isAuthenticated(), controller.addMoneyToWallet);

// router.get('/:id', controller.show);

 router.post('/', asyncMiddleware(controller.create));

 router.put('/',  auth.isAuthenticated(),asyncMiddleware(controller.update));

// router.delete('/:id', asyncMiddleware(controller.destroy);
router.post('/verify_otp',asyncMiddleware(controller.verifyOtp));

router.post('/mobile_otp', asyncMiddleware(controller.createOtp));
router.post('/profile-image', auth.isAuthenticated(), asyncMiddleware(controller.uploadImage));
//router.get('/image', auth.isAuthenticated(), asyncMiddleware(controller.getImage));
router.get('/get_image', auth.isAuthenticated(), asyncMiddleware(controller.getImage));

router.post('/resend_otp',asyncMiddleware(controller.resendOtp));



module.exports = router;
