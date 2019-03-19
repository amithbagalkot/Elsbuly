DROP PROCEDURE IF EXISTS  bs_trader_exchange_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_trader_exchange_get`
				(
					IN      i_trader_exchange_id	INT,
                    IN		i_trader_id				INT
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
	SELECT		te.trader_exchange_id
    ,           te.trader_id        
    ,           te.exchange_id	
    ,			be.exchange_code
    ,			be.exchange_name
    ,			be.display_name
    ,			te.date_created 
    ,			te.user_created
    ,			te.date_updated
    ,			te.user_updated
    FROM		bs_trader_exchange te
    INNER JOIN	bs_exchange be ON te.exchange_id=be.exchange_id
    WHERE		te.trader_exchange_id =  IFNULL(i_trader_exchange_id,te.trader_exchange_id) 
    AND			te.trader_id =  IFNULL(i_trader_id,te.trader_id)  
    AND			te.record_status_id = statusId
    ORDER BY 	be.exchange_name ASC;
end $$

DELIMITER ;