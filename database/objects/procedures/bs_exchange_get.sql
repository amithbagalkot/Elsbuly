DROP PROCEDURE IF EXISTS  bs_exchange_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_exchange_get`
				(
					IN      i_exchange_code		VARCHAR(50),
                    IN      i_country_code		VARCHAR(50),
                    IN		i_region_code		VARCHAR(50)
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
	SELECT		be.exchange_id
    ,			be.exchange_name
    ,			be.exchange_code
    ,			be.display_name    
    ,			be.display_order	
	,			be.description     
	,			be.idea_price		
	,			be.idea_cost		
    ,			bc.country_id
    ,			bc.country_code
    ,			bc.country_name
    ,			bc.region_id
    ,			br.region_name
    ,			br.region_code
    ,			be.date_created 
    ,			be.user_created
    ,			be.date_updated
    ,			be.user_updated
    FROM		bs_exchange be
    INNER JOIN	bs_country bc ON be.country_id=bc.country_id
    INNER JOIN	bs_region br ON bc.region_id=br.region_id
    WHERE		be.exchange_code =  IFNULL(i_exchange_code,be.exchange_code) 
    AND			bc.country_code =  IFNULL(i_country_code,bc.country_code) 
    AND			br.region_code = IFNULL(i_region_code,br.region_code) 
    AND			be.record_status_id = statusId
    AND			br.record_status_id = statusId
    AND			bc.record_status_id = statusId
    ORDER BY 	be.display_order ASC;
end $$

DELIMITER ;