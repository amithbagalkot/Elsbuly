'use strict'

const express = require('express');
const router = express.Router();
const preferenceController = require('./preference.controller');
const asyncMiddleware = require('../middleware/async');
const auth = require('../auth/auth.service');

router.post('/', auth.isAuthenticated(),  asyncMiddleware(preferenceController.createPreferences));

router.get('/', auth.isAuthenticated(),  asyncMiddleware(preferenceController.getPreferences));

router.put('/', auth.isAuthenticated(),  asyncMiddleware(preferenceController.updatePreferences));

module.exports = router;