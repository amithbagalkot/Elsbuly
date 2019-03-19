DROP PROCEDURE IF EXISTS  bs_trader_segment_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_trader_segment_get`
				(
					IN      i_trader_segment_id		INT,
                    IN		i_trader_id				INT,
                    in		i_segment_id			INT
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
	SELECT		ts.trader_segment_id
	,			ts.trader_id
	,			ts.segment_id	
    ,			bs.country_id
    ,			bs.segment_code
    ,			bs.segment_name
    ,			bs.display_name
    ,			bs.display_order
    ,			bs.description
    ,			bs.idea_price
    ,			bs.idea_cost
    ,			ts.date_created 
    ,			ts.user_created
    ,			ts.date_updated
    ,			ts.user_updated
    FROM		bs_trader_segment ts
    INNER JOIN	bs_segment bs ON ts.segment_id=bs.segment_id
    WHERE		ts.trader_segment_id =  IFNULL(i_trader_segment_id,ts.trader_segment_id) 
    AND			ts.trader_id =  IFNULL(i_trader_id,ts.trader_id)   
    AND			ts.segment_id =  IFNULL(i_segment_id,ts.segment_id)
    AND			ts.record_status_id = statusId
    ORDER BY 	bs.display_name ASC
    ;
end $$

DELIMITER ;