DROP PROCEDURE IF EXISTS  bs_idea_upi;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_idea_upi`
				(
			 IN		i_idea_id       			INT
			,IN		i_advisor_id           		INT
			,IN		i_idea_time					DATETIME
			,IN		i_idea_string				VARCHAR(2000)
			,IN		i_script_id					INT
			,IN		i_script_code				VARCHAR(80)
			,IN		i_exchange_id				INT
			,IN		i_exchange_code           	VARCHAR(80)
			,IN		i_instrument_id				INT
			,IN		i_instrument_code			VARCHAR(80)
			,IN		i_base_script_code			VARCHAR(80)
			,IN		i_country                 	VARCHAR(80)
			,IN		i_idea_type       	    	VARCHAR(80)
			,IN		i_idea_status             	VARCHAR(80)
			,IN		i_idea_status_note			VARCHAR(80)
			,IN		i_idea_strength       		VARCHAR(80)
			,IN		i_price_at_idea_open		INT
			,IN		i_start_range_price			INT
			,IN		i_end_range_price			INT
			,IN		i_price_target1				INT
			,IN		i_price_target2				INT
			,IN		i_price_target3				INT
			,IN		i_price_stoploss			INT
			,IN		i_trader_note				VARCHAR(500)
			,IN		i_advisor_note				VARCHAR(500)
			,IN		i_price_at_idea_close		INT
			,IN		i_advisor_rating			VARCHAR(40)
			,IN		i_advisor_rating_note		VARCHAR(180)
			,IN		i_price_target1_hit			VARCHAR(20)
			,IN		i_price_target1_hit_time	DATETIME
			,IN		i_price_target2_hit			VARCHAR(20)
			,IN		i_price_target2_hit_time	DATETIME
			,IN		i_price_target3_hit			VARCHAR(20)
			,IN		i_price_target3_hit_time	DATETIME
			,IN		i_price_stoploss_hit		VARCHAR(20)
			,IN		i_price_stoploss_hit_time	DATETIME
			,IN		i_record_status_id			INT
			,IN		i_date_created				DATETIME
			,IN		i_user_created				INT
			,IN		i_date_updated				DATETIME
			,IN		i_user_updated				INT
				)
begin

	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');

    IF i_idea_id IS NULL THEN
    BEGIN
	
-- THis is how Idea String needs to be built - But we may to have to do this at the front end to display on the screen for the advisor
/*
		
		select 	concat('"',bi.idea_type,' ',bi.script_name,' ',bi.instrument,' ',bi.exchange_code,' '
			  ,bi.base_symbol,' '
			  ,idea_type,' '
			  ,idea_strength,' '
   			  ,price_at_idea_open,' '
			  ,trader_note,' '
   			  ,'at ',bi.idea_time,' '
              ,'by ',ba.display_name
              ,'"') idea
from	bs_idea bi
,		bs_advisor ba
-- ,	bs_country bc
-- ,    bs_region br
where  	bi.advisor_id = ba.advisor_id	
*/
    INSERT INTO bs_idea
    (
		 advisor_id
		,idea_time
		,idea_string
		,script_id
		,script_code				
		,exchange_id
		,exchange_code
		,instrument_id
		,instrument_code
		,base_script_code
		,country
		,idea_type
		,idea_status
		,idea_status_note
		,idea_strength
		,price_at_idea_open
		,start_range_price
		,end_range_price
		,price_target1
		,price_target2
		,price_target3
		,price_stoploss
		,trader_note
		,advisor_note
		,price_at_idea_close
		,advisor_rating
		,advisor_rating_note
		,price_target1_hit
		,price_target1_hit_time
		,price_target2_hit
		,price_target2_hit_time
		,price_target3_hit
		,price_target3_hit_time
		,price_stoploss_hit
		,price_stoploss_hit_time
		,record_status_id
		,date_created
		,user_created
		,date_updated
		,user_updated
    )
    value
    (

		 i_advisor_id
		,i_idea_time
		,i_idea_string
		,i_script_id
		,i_script_code
		,i_exchange_id
		,i_exchange_code
		,i_instrument_id
		,i_instrument_code
		,i_base_script_code
		,i_country
		,i_idea_type
		,i_idea_status
		,i_idea_status_note
		,i_idea_strength
		,i_price_at_idea_open
		,i_start_range_price
		,i_end_range_price
		,i_price_target1
		,i_price_target2
		,i_price_target3
		,i_price_stoploss
		,i_trader_note
		,i_advisor_note
		,i_price_at_idea_close
		,i_advisor_rating
		,i_advisor_rating_note
		,i_price_target1_hit
		,i_price_target1_hit_time
		,i_price_target2_hit
		,i_price_target2_hit_time
		,i_price_target3_hit
		,i_price_target3_hit_time
		,i_price_stoploss_hit
		,i_price_stoploss_hit_time
		,statusId
		,i_date_created
		,i_user_created
		,i_date_updated
		,i_user_updated

    );
-- Once insert, we need to fine the subscriped traders for this idea ( call the correct procedures)
-- for each trader we get - we have to insert into idea_push table ( other service should pick from idea_push table and push to the traders)
-- Also, for each trader, reduce the payment ( bs_payment) and also insert a new the trader_ledger table with a proper informtion 	
	END;
    ELSE
	BEGIN	
		UPDATE bs_idea
		 SET advisor_id = i_advisor_id
		,	 idea_time = i_idea_time
		,	 idea_string = i_idea_string
		,	 script_id = i_script_id
		,	 script_code = i_script_code
		,	 exchange_id = i_exchange_id
		,	 exchange_code = i_exchange_code
		,	 instrument_id = i_instrument_id
		,	 instrument_code = i_instrument_code
		,	 base_script_code = i_base_script_code
		,	 country = i_country
		,	 idea_type = i_idea_type
		,	 idea_status = i_idea_status
		,	 idea_status_note = i_idea_status_note
		,	 idea_strength = i_idea_strength
		,	 price_at_idea_open = i_price_at_idea_open
		,	 start_range_price = i_start_range_price
		,	 end_range_price = i_end_range_price
		,	 price_target1 = i_price_target1
		,	 price_target2 = i_price_target2
		,	 price_target3 = i_price_target3
		,	 price_stoploss = i_price_stoploss
		,	 trader_note = i_trader_note
		,	 advisor_note = i_advisor_note
		,	 price_at_idea_close = i_price_at_idea_close
		,	 advisor_rating = i_advisor_rating
		,	 advisor_rating_note = i_advisor_rating_note
		,	 price_target1_hit = i_price_target1_hit
		,	 price_target1_hit_time = i_price_target1_hit_time
		,	 price_target2_hit = i_price_target2_hit
		,	 price_target2_hit_time = i_price_target2_hit_time
		,	 price_target3_hit = i_price_target3_hit
		,	 price_target3_hit_time = i_price_target3_hit_time
		,	 price_stoploss_hit = i_price_stoploss_hit
		,	 price_stoploss_hit_time = i_price_stoploss_hit_time
		,	 record_status_id = i_record_status_id
		,	 date_updated = i_date_updated
		,	 user_updated = i_user_updated
		WHERE idea_id=i_idea_id;
	END;
    END IF;


end $$

DELIMITER ;
