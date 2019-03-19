DROP PROCEDURE IF EXISTS  bs_trader_country_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_trader_country_get`
				(
					IN      i_trader_country_id		INT,
                    IN		i_trader_id				INT
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
	SELECT		tc.trader_country_id
    ,           tc.trader_id        
    ,           tc.country_id	
    ,			bc.country_code
    ,			bc.country_name
    ,           tc.current_record_id
    ,			tc.date_created 
    ,			tc.user_created
    ,			tc.date_updated
    ,			tc.user_updated
    FROM		bs_trader_country tc
    INNER JOIN	bs_country bc ON tc.country_id=bc.country_id
    WHERE		tc.trader_country_id =  IFNULL(i_trader_country_id,tc.trader_country_id) 
    AND			tc.trader_id =  IFNULL(i_trader_id,tc.trader_id)  
    AND			tc.record_status_id = statusId
    ORDER BY 	bc.country_name ASC;
end $$

DELIMITER ;