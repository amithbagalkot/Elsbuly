DROP PROCEDURE IF EXISTS  bs_region_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_region_get`
				(
					IN      i_region_code		VARCHAR(50)
                    
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	 
	SELECT		br.region_id
    ,			br.region_name
    ,			br.region_code
    ,			br.description
    ,			br.date_created 
    ,			br.user_created
    ,			br.date_updated
    ,			br.user_updated
    FROM		bs_region br
    WHERE		br.region_code = IFNULL(i_region_code,br.region_code) 
    AND			br.record_status_id=statusId
    ORDER BY 	br.region_name ASC;
end $$

DELIMITER ;