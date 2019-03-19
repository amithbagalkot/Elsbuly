DROP PROCEDURE IF EXISTS  bs_country_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_country_get`
				(
					IN      i_region_code		VARCHAR(50),
                    IN      i_country_code		VARCHAR(50)
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
	SELECT		bc.country_id
    ,			bc.country_code
    ,			bc.country_name
    ,			bc.description
    ,			bc.region_id
    ,			br.region_name
    ,			br.region_code
    ,			bc.telephone_code
    ,			bc.currency_code
    ,			bc.currency_name
    ,			bc.idea_price
    ,			bc.idea_cost
    ,			bc.idea_board_limit
    ,			bc.idea_board_trader_limit
    ,			bc.date_created 
    ,			bc.user_created
    ,			bc.date_updated
    ,			bc.user_updated
    FROM		bs_country bc
    INNER JOIN	bs_region br ON bc.region_id=br.region_id
    WHERE		br.region_code = IFNULL(i_region_code,br.region_code) 
    AND			bc.country_code =  IFNULL(i_country_code,bc.country_code) 
    AND			br.record_status_id = statusId
    AND			bc.record_status_id = statusId
    ORDER BY 	bc.country_name ASC;
end $$

DELIMITER ;