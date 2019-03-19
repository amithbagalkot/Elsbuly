DROP PROCEDURE IF EXISTS  bs_advisor_instrument_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_advisor_instrument_get`
				(
					IN      i_advisor_instrement_id	INT,
                    IN		i_advisor_id				INT
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
	SELECT		ai.advisor_instrement_id
    ,           ai.advisor_id      
    ,           ai.instrument_id	
    ,			bi.instrument_code
    ,			bi.instrument_name
    ,			bi.display_name
    ,			ai.date_created 
    ,			ai.user_created
    ,			ai.date_updated
    ,			ai.user_updated
    FROM		bs_advisor_instrument ai
    INNER JOIN	bs_instrument bi ON ai.instrument_id=bi.instrument_id
    WHERE		ai.advisor_instrement_id =  IFNULL(i_advisor_instrement_id,ai.advisor_instrement_id) 
    AND			ai.advisor_id =  IFNULL(i_advisor_id,ai.advisor_id)  
    AND			ai.record_status_id = statusId
    ORDER BY 	bi.instrument_name ASC;
end $$

DELIMITER ;