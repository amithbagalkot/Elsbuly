'use strict';

var fs = require('fs');
var traderService = require("./trader.service.js");
var userService = require('../user/user.service');
var errorHandler = require("../../util/errorHandler");
var responseSender = require("../../util/responseSender");


function handleError (res, err) {
  return res.status(500).send(err);
}


/**
 * Get list of Trader
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  fs.readFile('server/api/trader/trader.data.json', 'utf-8', function (err, traders) {
    if (err) { return handleError(res, err); }
    res.status(200).json(JSON.parse(traders));
  });
};


/**
 * Get a single Trader
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  res.status(200).json({});
};


/**
 * Creates a new Trader in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  res.status(201).json({});
};


/**
 * Updates an existing Trader in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  res.status(200).json({});
};


/**
 * Deletes a Trader from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  return res.status(204);
};

exports.createSubscription = async function(req,res){
	var advisorId = req.body.advisorId;
	var traderId = req.user._id;
	try{
		var data = await traderService.createSubscription(traderId,advisorId,traderId,traderId);
		responseSender(req,res,data);
	}
	catch(e){
		errorHandler(req,res,{msg:"Unknown error"},500);
	}
	
}

exports.cancelSubscription = async function(req,res){
	var advisorId = req.params.advisorId;
	var traderId = req.user._id;
	
	try{
		var data = await traderService.cancelSubscription(traderId,advisorId);	
		responseSender(req,res,data);
	}
	catch(e){
		errorHandler(req,res,{msg:"Unknown error"},500);
	}
	
}

exports.addIdeaBoard = async function (ideaId, telephone) {
		var dataTelephone = await userService.verifyOtp(telephone);
		if(telephone) {
			var data = await traderService.getCountry(telephone);
			var ideaBoardLimit = data[0][0]['idea_board_limit'];
			var ideaBoardTraderLimit = data[0][0]['idea_board_trader_limit'];
			for(var i= 1; i<=ideaBoardLimit; i++) {
				var ideaBoardNumber = 0;
				ideaBoardNumber+= i;
				var ideaBoardName = 'chat Board' + '' + ideaBoardNumber;
				var dataIdeaBoard = await traderService.addIdeaBoard(ideaId, ideaBoardNumber, ideaBoardName, ideaBoardTraderLimit);
			}
		}
}

exports.getIdeaBoard = async function(req, res) {
	var idea_id = req.params.idea_id;
	try {
		var data = await traderService.getIdeaBoard(idea_id);
		responseSender(req, res, data);
	}
	catch(e) {
		errorHandler(req, res, {msg: "Unknown error"}, 500);
	}
};

exports.getIdeaBoardTrader = async function (req, res) {
	var ideaId = req.params.idea_id;
	var traderId = req.user._id;
	try {
		var data = await traderService.getIdeaBoardTrader(ideaId, traderId);
		responseSender(req, res, data);
	}
	catch(e) {
		errorHandler(req, res, {msg: "Unknown error"}, 500);
	}
}

exports.addIdeaBoardTrader = async function(req, res) {
	var traderId = req.user._id;
	var ideaBoardTraderObj = req.body;
	var ideaId = ideaBoardTraderObj.ideaId;
	var ideaBoard = ideaBoardTraderObj.ideaBoard;
	try {
		var data = await traderService.addIdeaBoardTrader(ideaId, ideaBoard, traderId);
		responseSender(req, res, data);
	}
	catch(e) {
		errorHandler(req, res, {msg: "Unknown error"}, 500);
	}
}

exports.getSubscription = async function(req,res){   
	var userTypeId = req.user.userTypeId;
        if(userTypeId==30102){
			var advisorId = req.user._id;
			var traderId=null;
		}
		if(userTypeId==30101){
			var  traderId= req.user._id;
			var advisorId=null;
		}
	try{
		var data = await traderService.getSubscription(traderId,advisorId);	
		responseSender(req,res,data);
	}
	catch(e){
		errorHandler(req,res,{msg:"Unknown error"},500);
	}
}

exports.getIdeas = async function(req,res){
	var traderId = req.user._id;
	try{
		var data = await traderService.getIdeas(traderId);	
		responseSender(req,res,data);
	}
	catch(e){
		errorHandler(req,res,{msg:"Unknown error"},500);
	}
	
}

exports.getAdvisorList = async function(req, res) {
	var traderId = req.user_id;
	var data = await traderService.getAdvisorList(traderId);
	responseSender(req,res,data);
}

exports.getAdviosrIdeas=async function(req,res){
	var advisorId=req.params.advisorId
	var traderId = req.user._id;
	try{
		var data = await traderService.getAdviosrIdeas(advisorId,traderId);	
		responseSender(req,res,data);
	}
	catch(e){
		errorHandler(req,res,{msg:"Unknown error"},500);
	}
}
exports.discussionJoin=async function(req,res){
		var userID=req.user._id;
		var userEmail=req.user.email;
		var userName=req.user.userName ;
		var idea_id = req.body.id
		var discussion_board_type=req.body.discussion_board.discussion_board_type;
		var discussion_board_id=req.body.discussion_board.discussion_board_id;
		 try{
			var data = await traderService.discussionJoin(userID,idea_id, userName,userEmail,discussion_board_type,discussion_board_id);
			responseSender(req,res,data);
		 }catch(err){
			errorHandler(req,res,{msg:"Unknown error"},500);
		 }
}
exports.discussionExit=async function(req,res){
			var userID=req.user._id;
			var ideaId = req.params.ideaId;
			var ideaBoardId = req.params.ideaBoardId;
	try{
		var data = await traderService.discussionExit(userID, ideaId, ideaBoardId );
		responseSender(req,res,data);
	}catch(err){
			errorHandler(req,res,{msg:"Unknown error"},500);
	}	
}
exports.getDiscussionUser=async function(req,res){
			 var discussion_board_id=req.params.discussion_board_id;
			 var idea_id = req.params.idea_id;
			 var userID=req.user._id;
	try{
		var data = await traderService.getDiscussionUser(discussion_board_id, idea_id);
		responseSender(req,res,data);
	}catch(err){
		errorHandler(req,res,{msg:err},500);
	}
}
