DROP PROCEDURE IF EXISTS  bs_advisor_exchange_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_advisor_exchange_get`
				(
					IN      i_advisor_exchange_id	INT,
                    IN		i_advisor_id			INT
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
	SELECT		ae.advisor_exchange_id
    ,           ae.advisor_id        
    ,           ae.exchange_id	
    ,			be.exchange_code
    ,			be.exchange_name
    ,			be.display_name
    ,			ae.date_created 
    ,			ae.user_created
    ,			ae.date_updated
    ,			ae.user_updated
    FROM		bs_advisor_exchange ae
    INNER JOIN	bs_exchange be ON ae.exchange_id=be.exchange_id
    WHERE		ae.advisor_exchange_id =  IFNULL(i_advisor_exchange_id,ae.advisor_exchange_id) 
    AND			ae.advisor_id =  IFNULL(i_advisor_id,ae.advisor_id)  
    AND			ae.record_status_id = statusId
    ORDER BY 	be.exchange_name ASC;
end $$

DELIMITER ;