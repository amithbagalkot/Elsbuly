DROP PROCEDURE IF EXISTS  bs_script_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_script_get`
				(
					IN      i_script_code		VARCHAR(50),
                    IN      i_exchange_code		VARCHAR(50),
                    IN      i_country_code		VARCHAR(50),
                    IN		i_region_code		VARCHAR(50)
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
	SELECT		bs.script_id			
    ,			bs.script_code		
    ,			bs.script_name     
    ,			bs.expiry			
    ,			bs.strike			
    ,			bs.tick_size		
    ,			bs.lot_size		
    ,			bs.instrument		
    ,			bs.segment			
    ,			bs.base_symbol		
    ,			bs.description     
    ,			bs.display_name    
    ,			bs.display_order	
    ,			bs.idea_price		
    ,			bs.idea_cost		
    ,			be.exchange_id
    ,			be.exchange_name
    ,			be.exchange_code
    ,			bc.country_id
    ,			bc.country_name
    ,			bc.country_code
    ,			bc.region_id
    ,			br.region_name
    ,			br.region_code
    ,			bs.date_created 
    ,			bs.user_created
    ,			bs.date_updated
    ,			bs.user_updated
    FROM		bs_script bs
    INNER JOIN	bs_exchange be ON be.exchange_id=bs.exchange_id
    INNER JOIN	bs_country bc ON bs.country_id=bc.country_id
    INNER JOIN	bs_region br ON bc.region_id=br.region_id
    WHERE		bs.script_code =  IFNULL(i_script_code,bs.script_code) 
    AND			be.exchange_code =  IFNULL(i_exchange_code,be.exchange_code) 
    AND			bc.country_code =  IFNULL(i_country_code,bc.country_code) 
    AND			br.region_code = IFNULL(i_region_code,br.region_code) 
    AND			bs.record_status_id = statusId
    AND			be.record_status_id = statusId
    AND			br.record_status_id = statusId
    AND			bc.record_status_id = statusId
    ORDER BY 	bs.display_order ASC;
end $$

DELIMITER ;