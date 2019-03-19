DROP PROCEDURE IF EXISTS  bs_idea_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_idea_get`(
					IN      i_idea_id		INT,
                    IN      i_advisor_id	INT
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
	SELECT		idea_id
    ,			bu.user_name
	,			bi.advisor_id
	,			bi.idea_time
	,			bi.idea_string
	,			bi.script_id
	,			bi.script_code AS actual_script_code
    ,			bs.script_code 
	,			bi.exchange_id
	,			bi.exchange_code AS actual_exchange_code
    ,			be.exchange_code
	,			bi.instrument_id
	,			bi.instrument_code AS actual_instrument_code
	,			bin.instrument_code
	,			bi.base_script_code
	,			bi.country
	,			bi.idea_type
	,			bi.idea_status
	,			bi.idea_status_note
	,			bi.idea_strength
	,			bi.price_at_idea_open
	,			bi.start_range_price
	,			bi.end_range_price
	,			bi.price_target1
	,			bi.price_target2
	,			bi.price_target3
	,			bi.price_stoploss
	,			bi.trader_note
	,			bi.advisor_note
	,			bi.price_at_idea_close
	,			bi.advisor_rating
	,			bi.advisor_rating_note
	,			bi.price_target1_hit
	,			bi.price_target1_hit_time
	,			bi.price_target2_hit
	,			bi.price_target2_hit_time
	,			bi.price_target3_hit
	,			bi.price_target3_hit_time
	,			bi.price_stoploss_hit
	,			bi.price_stoploss_hit_time
    ,			bi.date_created 
    ,			bi.user_created
    ,			bi.date_updated
    ,			bi.user_updated
    FROM		bs_idea bi
    INNER JOIN 	bs_user bu  ON  bu.user_id = IFNULL(i_advisor_id, bi.advisor_id)
    INNER JOIN	bs_script bs ON bi.script_id=bs.script_id
    INNER JOIN	bs_exchange be ON be.exchange_id=bs.exchange_id
	LEFT OUTER JOIN bs_instrument bin ON bi.instrument_id=bin.instrument_id
	WHERE		bi.idea_id =  IFNULL(i_idea_id,bi.idea_id) 
    AND			bi.advisor_id =  IFNULL(i_advisor_id,bi.advisor_id) 
    AND			bi.record_status_id = statusId
    ORDER BY 	bi.idea_id DESC;
    end $$

DELIMITER ;