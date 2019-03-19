const db = require("../../models");
const util = require("../../util/util.js");
var ideaDbActions = {};

async function createIdea(advisor_id,date,idea_string,script_id,script_code,exchange_id,exchange_code,instrument_id,instrument_code,base_script_code,country,idea_type,idea_status,idea_status_note,idea_strength,price_at_idea_open,start_range_price,end_range_price,price_target1,price_target2,price_target3,price_stoploss,trader_note,advisor_note,price_at_idea_close,dvisor_rating,advisor_rating_note,price_target1_hit,price_target1_hit_time,price_target2_hit,price_target2_hit_time,price_target3_hit,price_target3_hit_time,price_stoploss_hit,price_stoploss_hit_time,record_status_id,date_created,user_created,date_updated,user_updated) {
  var command = `CALL bs_idea_upi(null, ${util.formatQueryData(advisor_id)},${util.formatQueryData(date)},${util.formatQueryData(idea_string)},${util.formatQueryData(script_id)},${util.formatQueryData(script_code)},${util.formatQueryData(exchange_id)},${util.formatQueryData(exchange_code)},${util.formatQueryData(instrument_id)},${util.formatQueryData(instrument_code)},${util.formatQueryData(base_script_code)},${util.formatQueryData(country)},${util.formatQueryData(idea_type)},${util.formatQueryData(idea_status)},${util.formatQueryData(idea_status_note)},${util.formatQueryData(idea_strength)},${util.formatQueryData(price_at_idea_open)},${util.formatQueryData(start_range_price)},${util.formatQueryData(end_range_price)},${util.formatQueryData(price_target1)},${util.formatQueryData(price_target2)},${util.formatQueryData(price_target3)},${util.formatQueryData(price_stoploss)},${util.formatQueryData(trader_note)},${util.formatQueryData(advisor_note)},${util.formatQueryData(price_at_idea_close)},${util.formatQueryData(dvisor_rating)},${util.formatQueryData(advisor_rating_note)},${util.formatQueryData(price_target1_hit)},${util.formatQueryData(price_target1_hit_time)},${util.formatQueryData(price_target2_hit)},${util.formatQueryData(price_target2_hit_time)},${util.formatQueryData(price_target3_hit)},${util.formatQueryData(price_target3_hit_time)},${util.formatQueryData(price_stoploss_hit)},${util.formatQueryData(price_stoploss_hit_time)},${util.formatQueryData(record_status_id)},${util.formatQueryData(date_created)},${util.formatQueryData(user_created)},${util.formatQueryData(date_updated)},${util.formatQueryData(user_updated)})`;
  var newIdea = await db.sequelize.query(command);
  return newIdea;
}

async function updateIdea(ideaObject) {
  return createIdea(ideaObject);
}

async function getIdea(ideaId, advisorId) {
  // var data = [
  //   {
  //     idea_id: 1,
  //     advisor_id: 1,
  //     idea_time: "2016-05-11 10:14:58",
  //     idea_string: ".",
  //     script_name: "ZINC",
  //     exchange_code: "NYSE",
  //     instrument: "EQ",
  //     base_symbol: "",
  //     country: "US",
  //     idea_type: "BUY",
  //     idea_status: "",
  //     idea_status_note: "",
  //     idea_strength: "MT",
  //     price_at_idea_open: 587,
  //     start_range_price: 0,
  //     end_range_price: 0,
  //     price_target1: 0,
  //     price_target2: 0,
  //     price_target3: 0,
  //     price_stoploss: 0,
  //     trader_note: "",
  //     advisor_note: "",
  //     price_at_idea_close: 0,
  //     price_target1_hit: "",
  //     price_target1_hit_time: "2016-05-11 10:14:58",
  //     price_target2_hit: "",
  //     price_target2_hit_time: "2016-05-11 10:14:58",
  //     price_target3_hit: "",
  //     price_target3_hit_time: "2016-05-11 10:14:58",
  //     price_stoploss_hit: "",
  //     price_stoploss_hit_time: "2016-05-11 10:14:58",
  //     record_status_id: 10101,
  //     date_created: "2018-01-01 00:00:00",
  //     user_created: 110,
  //     date_updated: "2018-01-01 00:00:00",
  //     user_updated: 110,
  //     script_id: 0
  //   },
  // var singleIdea = null;
  // if(ideaId){
  //     var found = false;
  //     for(var i=0;i<data.length;i++){
  //         if(data[i].idea_id==ideaId){
  //             singleIdea = data[i];
  //             found = true;
  //             break;
  //         }
  //     }
  //     if(found){
  //         return singleIdea;
  //     }
  //     else
  //     {
  //       return nunll
  //     }
  //
  // }
  // else
  // {
  //     return data;
  // }
  var command = `CALL bs_idea_get(${util.formatQueryData(ideaId)},${util.formatQueryData(advisorId)})`
  return await db.sequelize.query(command);
}

async function createPushIdea(pushIdeaObject) {
  var command = `CALL bs_idea_push_upi('${trader_id}','${idea_string}','${idea_push_phone}','${idea_push_status}','${idea_push_date}','${record_status_id}','${date_created}','${user_created}','${date_updated}','${user_updated}')`;
  var newPushIdea = await db.sequelize.query(command);
  return newPushIdea;
}

// update is same as create for now.
async function updatePushIdea(pushIdeaObject) {
  return createPushIdea(pushIdeaObject);
}

async function getPushIdea(ideaId, ideaPushId, traderId) {
  var command = `CALL bs_idea_push_get('${ideaId}','${advisorId}','${traderId}')`;
  var idea = await db.sequelize.query(command);
  return idea;
}

async function getIdeaRating(ideaRatingId, ideaId,traderId) {
  var command = `CALL bs_idea_rating_get(${util.formatQueryData(ideaRatingId)},${util.formatQueryData(ideaId)},${util.formatQueryData(traderId)})`;
  var idea = await db.sequelize.query(command);
  return idea;
}

async function createIdeaRating(ideaId,traderId,ideaRating, ideaRatingNote,recordStatusId,dateCreated,userCreated,dateUpdated,userUpdated) {
  var command = `CALL bs_idea_rating_upi(null,${util.formatQueryData(ideaId)},${util.formatQueryData(traderId)},${util.formatQueryData(ideaRating)},${util.formatQueryData(ideaRatingNote)},${util.formatQueryData(recordStatusId)},${util.formatQueryData(dateCreated)},${util.formatQueryData(userCreated)},${util.formatQueryData(dateUpdated)},${util.formatQueryData(userUpdated)})`;
  var idea = await db.sequelize.query(command);
  // var data=await db.sequelize.query('select @o_return_value As o_return_value');
  return idea;
}

module.exports = {
  createIdea,
  updateIdea,
  getIdea,
  createPushIdea,
  updatePushIdea,
  getPushIdea,
  getIdeaRating,
  createIdeaRating
};
