DROP PROCEDURE IF EXISTS  bs_segment_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_segment_get`
				(
					IN      i_segment_code		VARCHAR(50),
                    IN      i_country_code		VARCHAR(50),
                    IN		i_region_code		VARCHAR(50)
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
	SELECT		bs.segment_id
    ,			bs.segment_name
    ,			bs.segment_code
    ,			bs.display_name    
    ,			bs.display_order	
	,			bs.description     
	,			bs.idea_price		
	,			bs.idea_cost		
    ,			bc.country_id
    ,			bc.country_code
    ,			bc.country_name
    ,			bc.region_id
    ,			br.region_name
    ,			br.region_code
    ,			bs.date_created 
    ,			bs.user_created
    ,			bs.date_updated
    ,			bs.user_updated
    FROM		bs_segment bs
    INNER JOIN	bs_country bc ON bs.country_id=bc.country_id
    INNER JOIN	bs_region br ON bc.region_id=br.region_id
    WHERE		bs.segment_code =  IFNULL(i_segment_code,bs.segment_code) 
    AND			bc.country_code =  IFNULL(i_country_code,bc.country_code) 
    AND			br.region_code = IFNULL(i_region_code,br.region_code) 
    AND			bs.record_status_id = statusId
    AND			br.record_status_id = statusId
    AND			bc.record_status_id = statusId
    ORDER BY 	bs.display_order ASC;
end $$

DELIMITER ;