DROP PROCEDURE IF EXISTS  bs_idea_rating_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_idea_rating_get`
				(
					IN		i_idea_rating_id INT,
                    IN      i_idea_id		 INT,
                    IN      i_trader_id		 INT
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
	SELECT		ir.idea_rating_id  
    ,           ir.idea_id         
    ,           ir.trader_id
    ,           bu.user_name  As trader_name
    ,           ir.idea_rating		
    ,           ir.idea_rating_note
    ,			ir.date_created 
    ,			ir.user_created
    ,			ir.date_updated
    ,			ir.user_updated
    FROM		bs_idea_rating ir
    INNER JOIN  bs_user bu ON ir.trader_id=bu.user_id
    WHERE		ir.idea_rating_id =  IFNULL(i_idea_rating_id,ir.idea_rating_id) 
    AND			ir.idea_id =  IFNULL(i_idea_id,ir.idea_id) 
    AND			ir.trader_id =  IFNULL(i_trader_id,ir.trader_id) 
    AND			ir.record_status_id = statusId
    ORDER BY 	ir.date_created  DESC;
end $$

DELIMITER ;