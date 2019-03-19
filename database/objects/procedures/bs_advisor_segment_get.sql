DROP PROCEDURE IF EXISTS  bs_advisor_segment_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_advisor_segment_get`
				(
					IN      i_advisor_segment_id		INT,
                    IN		i_advisor_id				INT,
                    in		i_segment_id			INT
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
	SELECT		bas.advisor_segment_id
	,			bas.advisor_id
	,			bas.segment_id	
    ,			bs.country_id
    ,			bs.segment_code
    ,			bs.segment_name
    ,			bs.display_name
    ,			bs.display_order
    ,			bs.description
    ,			bs.idea_price
    ,			bs.idea_cost
    ,			bas.date_created 
    ,			bas.user_created
    ,			bas.date_updated
    ,			bas.user_updated
    FROM		bs_advisor_segment bas
    INNER JOIN	bs_segment bs ON bas.segment_id=bs.segment_id
    WHERE		bas.advisor_segment_id =  IFNULL(i_advisor_segment_id,bas.advisor_segment_id) 
    AND			bas.advisor_id =  IFNULL(i_advisor_id,bas.advisor_id)   
    AND			bas.segment_id =  IFNULL(i_segment_id,bas.segment_id)
    AND			bas.record_status_id = statusId
    ORDER BY 	bs.display_name ASC
    ;
end $$

DELIMITER ;