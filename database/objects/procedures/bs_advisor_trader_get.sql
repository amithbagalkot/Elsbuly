DROP PROCEDURE IF EXISTS  bs_advisor_trader_get;

DELIMITER $$

CREATE PROCEDURE `bs_advisor_trader_get`(
					IN      i_advisor_trader_id		INT,
                    IN		i_advisor_id			INT,					
                    IN		i_trader_id				INT
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
	SELECT		at.advisor_trader_id
    ,           at.advisor_id
    ,           at.trader_id        
    ,			but.user_name As traderName
    ,			but.email_id As traderEmail
	,			but.telephone AS telephone
    ,			at.date_created 
    ,			at.user_created
    ,			at.date_updated
    ,			at.user_updated
    FROM		bs_advisor_trader at
    INNER JOIN bs_user but ON but.user_id   =   at.trader_id
    WHERE		at.trader_advisor_id =  IFNULL(i_trader_advisor_id,at.trader_advisor_id) 
    AND			at.trader_id =  IFNULL(i_trader_id,at.trader_id)
	AND			at.advisor_id =  IFNULL(i_advisor_id,at.advisor_id)  
    AND			at.record_status_id = statusId
    ;
end