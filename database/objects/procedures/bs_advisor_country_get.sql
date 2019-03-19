DROP PROCEDURE IF EXISTS  bs_advisor_country_get;

-- --------------------------------------------------------------------------------
-- Created Date : 15th April 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_advisor_country_get`
				(
					IN      i_advisor_country_id		INT,
                    IN		i_advisor_id				INT
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
	SELECT		ac.advisor_country_id
    ,           ac.advisor_id        
    ,           ac.country_id	
    ,			bc.country_code
    ,			bc.country_name
    ,           ac.current_record_id
    ,			ac.date_created 
    ,			ac.user_created
    ,			ac.date_updated
    ,			ac.user_updated
    FROM		bs_advisor_country ac
    INNER JOIN	bs_country bc ON ac.country_id=bc.country_id
    WHERE		ac.advisor_country_id =  IFNULL(i_advisor_country_id,ac.advisor_country_id) 
    AND			ac.advisor_id =  IFNULL(i_advisor_id,ac.advisor_id)  
    AND			ac.record_status_id = statusId
    ORDER BY 	bc.country_name ASC;
end $$

DELIMITER ;