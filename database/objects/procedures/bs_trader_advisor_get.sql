DROP PROCEDURE IF EXISTS  bs_trader_advisor_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_trader_advisor_get`
				(
					IN      i_trader_advisor_id		INT,
                    IN		i_trader_id				INT,
                    IN		i_advisor_id			INT
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT; 

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
	SELECT		ta.trader_advisor_id
    ,           ta.trader_id        
    ,           ta.advisor_id	
	,			but.user_name As advisorName
    ,			but.email_id As advisorEmail
	,			but.telephone AS telephone
    ,			ta.date_created 
    ,			ta.user_created
    ,			ta.date_updated
    ,			ta.user_updated
    FROM		bs_trader_advisor ta
      INNER JOIN bs_user but ON but.user_id   =   ta.advisor_id
    WHERE		ta.trader_advisor_id =  IFNULL(i_trader_advisor_id,ta.trader_advisor_id) 
    AND			ta.trader_id =  IFNULL(i_trader_id,ta.trader_id)  
	AND			ta.advisor_id =  IFNULL(i_advisor_id,ta.advisor_id)  
    AND			ta.record_status_id = statusId
    ;
end $$

DELIMITER ;