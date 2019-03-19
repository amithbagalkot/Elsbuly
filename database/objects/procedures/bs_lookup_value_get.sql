DROP PROCEDURE IF EXISTS  bs_lookup_value_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_lookup_value_get`
				(
					IN      i_lookup_type		VARCHAR(50),
                    IN		i_lookup_code		VARCHAR(50)
                    
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	 
	SELECT		lv.lookup_value_id
    ,			lv.lookup_value
    ,			lv.lookup_code
    ,			lv.description
    ,			lv.display_order
    ,			lt.lookup_type_id
    ,			lt.lookup_type
    ,			lv.date_created 
    ,			lv.user_created
    ,			lv.date_updated
    ,			lv.user_updated
    FROM		bs_lookup_value lv
    INNER JOIN	bs_lookup_type lt ON lv.lookup_type_id=lt.lookup_type_id
    WHERE		lt.lookup_type = IFNULL(i_lookup_type,lt.lookup_type) 
    AND			lv.lookup_code = IFNULL(i_lookup_code,lv.lookup_code) 
    AND			lv.record_status_id=statusId
    ORDER BY 	lv.display_order ASC;
end $$

DELIMITER ;