const express = require('express');
const router = express.Router();
const controller = require('./common.controller');
const asyncMiddleware= require('../middleware/async');

router.get("/country",asyncMiddleware(controller.getCountry));

router.get("/region",asyncMiddleware(controller.getRegion));

router.get("/segment",asyncMiddleware(controller.getSegment));

router.get("/exchange",asyncMiddleware(controller.getExchange));

router.get("/instrument",asyncMiddleware(controller.getInstrument));

router.get("/script",asyncMiddleware(controller.getScript));

module.exports = router;
