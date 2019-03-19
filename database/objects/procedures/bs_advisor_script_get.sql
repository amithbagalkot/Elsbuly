DROP PROCEDURE IF EXISTS  bs_advisor_script_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_advisor_script_get`
				(
					IN      i_advisor_script_id		INT,
                    IN		i_advisor_id			INT,
                    in		i_script_id				INT
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
	SELECT		bas.advisor_script_id
	,			bas.advisor_id
	,			bas.script_id	
    ,			bs.exchange_id
    ,			bs.country_id
    ,			bs.script_code
    ,			bs.script_name
    ,			bs.expiry
    ,			bs.strike
    ,			bs.tick_size
    ,			bs.lot_size
    ,			bs.instrument
    ,			bs.segment
    ,			bs.base_script_code
    ,			bs.base_symbol
    ,			bs.description
    ,			bs.display_name
    ,			bs.display_order
    ,			bs.idea_price
    ,			bs.idea_cost
    ,			bas.date_created 
    ,			bas.user_created
    ,			bas.date_updated
    ,			bas.user_updated
    FROM		bs_advisor_script bas
    INNER JOIN	bs_script bs ON bas.script_id=bs.script_id
    WHERE		bas.advisor_script_id =  IFNULL(i_advisor_script_id,bas.advisor_script_id) 
    AND			bas.advisor_id =  IFNULL(i_advisor_id,bas.advisor_id)   
    AND			bas.script_id =  IFNULL(i_script_id,bas.script_id)
    AND			bas.record_status_id = statusId
    ORDER BY 	bs.display_name ASC
    ;
end $$

DELIMITER ;