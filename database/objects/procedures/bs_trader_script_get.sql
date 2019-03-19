DROP PROCEDURE IF EXISTS  bs_trader_script_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_trader_script_get`
				(
					IN      i_trader_script_id		INT,
                    IN		i_trader_id				INT,
                    in		i_script_id				INT
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
	SELECT		ts.trader_script_id
	,			ts.trader_id
	,			ts.script_id	
    ,			bs.exchange_id
    ,			bs.country_id
    ,			bs.script_code
    ,			bs.script_name
    ,			bs.expiry
    ,			bs.strike
    ,			bs.tick_size
    ,			bs.lot_size
    ,			bs.instrument
    ,			bs.segment
    ,			bs.base_script_code
    ,			bs.base_symbol
    ,			bs.description
    ,			bs.display_name
    ,			bs.display_order
    ,			bs.idea_price
    ,			bs.idea_cost
    ,			ts.date_created 
    ,			ts.user_created
    ,			ts.date_updated
    ,			ts.user_updated
    FROM		bs_trader_script ts
    INNER JOIN	bs_script bs ON ts.script_id=bs.script_id
    WHERE		ts.trader_script_id =  IFNULL(i_trader_script_id,ts.trader_script_id) 
    AND			ts.trader_id =  IFNULL(i_trader_id,ts.trader_id)   
    AND			ts.script_id =  IFNULL(i_script_id,ts.script_id)
    AND			ts.record_status_id = statusId
    ORDER BY 	bs.display_name ASC
    ;
end $$

DELIMITER ;