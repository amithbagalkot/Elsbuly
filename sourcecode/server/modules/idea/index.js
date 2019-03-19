'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./idea.controller');
var auth = require("../auth/auth.service");
const asyncMiddleware= require('../middleware/async');

// router.get('/', controller.index);
// router.get('/:id', controller.show);
router.post('/push', auth.isAuthenticated(),asyncMiddleware(controller.createPushIdea));

router.put('/push/:ideaId', auth.isAuthenticated(),asyncMiddleware(controller.updatePushIdea));

router.get('/', auth.isAuthenticated(), asyncMiddleware(controller.getIdeas));

router.post('/',auth.isAuthenticated(), asyncMiddleware(controller.createIdea));

router.get('/:ideaId/rating',auth.isAuthenticated(), asyncMiddleware(controller.getIdeaRatings));

router.post('/:ideaId/rating',auth.isAuthenticated(), asyncMiddleware(controller.createIdeaRating));

router.get('/:ideaId',auth.isAuthenticated(),asyncMiddleware(controller.getIdea))

router.get('/:ideaId/:ideaRatingId', auth.isAuthenticated(),asyncMiddleware(controller.getIdeaRating));

router.put('/:ideaId', auth.isAuthenticated(),asyncMiddleware(controller.updateIdea));


module.exports = router;
