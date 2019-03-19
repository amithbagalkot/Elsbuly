DROP PROCEDURE IF EXISTS  bs_trader_instrument_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_trader_instrument_get`
				(
					IN      i_trader_instrument_id	INT,
                    IN		i_trader_id				INT
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
	SELECT		ti.trader_instrument_id
    ,           ti.trader_id        
    ,           ti.instrument_id	
    ,			bi.instrument_code
    ,			bi.instrument_name
    ,			bi.display_name
    ,			ti.date_created 
    ,			ti.user_created
    ,			ti.date_updated
    ,			ti.user_updated
    FROM		bs_trader_instrument ti
    INNER JOIN	bs_instrument bi ON ti.instrument_id=bi.instrument_id
    WHERE		ti.trader_instrument_id =  IFNULL(i_trader_instrument_id,ti.trader_instrument_id) 
    AND			ti.trader_id =  IFNULL(i_trader_id,ti.trader_id)  
    AND			ti.record_status_id = statusId
    ORDER BY 	bi.instrument_name ASC;
end $$

DELIMITER ;