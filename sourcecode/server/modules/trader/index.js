'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./trader.controller');
var auth = require("../auth/auth.service");
const asyncMiddleware= require('../middleware/async');

router.get('/', asyncMiddleware(controller.index));

router.get('/subscription', auth.isAuthenticated(), controller.getSubscription);

router.get('/discussionUser/:discussion_board_id/:idea_id',auth.isAuthenticated(), controller.getDiscussionUser);

router.post('/subscription', auth.isAuthenticated(), controller.createSubscription);

router.post('/addIdeaBoard', auth.isAuthenticated(), controller.addIdeaBoard);

router.post('/addIdeaBoardTrader', auth.isAuthenticated(), controller.addIdeaBoardTrader); 

router.get('/addIdeaBoard/:idea_id', auth.isAuthenticated(), controller.getIdeaBoard);

router.get('/getIdeaBoardTrader/:idea_id', auth.isAuthenticated(), controller.getIdeaBoardTrader)

router.delete('/cancel_subscription/:advisorId', auth.isAuthenticated(), controller.cancelSubscription);

router.get('/ideas', auth.isAuthenticated(), controller.getIdeas);

router.get('/:advisorId', auth.isAuthenticated(), controller.getAdviosrIdeas);

router.post('/discussionJoin',auth.isAuthenticated(), controller.discussionJoin);


router.get('/:advisorId', auth.isAuthenticated(), controller.getAdviosrIdeas);

router.post('/discussionJoin',auth.isAuthenticated(), controller.discussionJoin);

router.delete('/discussionExit/:ideaId/:ideaBoardId',auth.isAuthenticated(), controller.discussionExit);

router.get('/:id', asyncMiddleware(controller.show));

router.post('/', asyncMiddleware(controller.create));

router.put('/:id', asyncMiddleware(controller.update));

router.delete('/:id', asyncMiddleware(controller.destroy));

module.exports = router;