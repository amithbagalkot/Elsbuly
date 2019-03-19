DROP PROCEDURE IF EXISTS  bs_instrument_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_instrument_get`
				(
					IN      i_instrument_code		VARCHAR(50),
                    IN      i_country_code		VARCHAR(50),
                    IN		i_region_code		VARCHAR(50)
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
	SELECT		bi.instrument_id
    ,			bi.instrument_name
    ,			bi.instrument_code
    ,			bi.display_name    
    ,			bi.display_order	
	,			bi.description     
	,			bi.idea_price		
	,			bi.idea_cost		
    ,			bc.country_id
    ,			bc.country_code
    ,			bc.country_name
    ,			bc.region_id
    ,			br.region_name
    ,			br.region_code
    ,			bi.date_created 
    ,			bi.user_created
    ,			bi.date_updated
    ,			bi.user_updated
    FROM		bs_instrument bi
    INNER JOIN	bs_country bc ON bi.country_id=bc.country_id
    INNER JOIN	bs_region br ON bc.region_id=br.region_id
    WHERE		bi.instrument_code =  IFNULL(i_instrument_code,bi.instrument_code) 
    AND			bc.country_code =  IFNULL(i_country_code,bc.country_code) 
    AND			br.region_code = IFNULL(i_region_code,br.region_code) 
    AND			bi.record_status_id = statusId
    AND			br.record_status_id = statusId
    AND			bc.record_status_id = statusId
    ORDER BY 	bi.display_order ASC;
end $$

DELIMITER ;