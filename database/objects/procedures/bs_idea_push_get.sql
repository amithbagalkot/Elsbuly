DROP PROCEDURE IF EXISTS  bs_idea_push_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_idea_push_get`
				(
					IN		i_idea_push_id	INT,
                    IN      i_idea_id		INT,
                    IN      i_trader_id		INT
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
	SELECT		ip.idea_push_id    
    ,           ip.idea_id         
    ,           ip.trader_id		
    ,           ip.idea_string		
    ,           ip.idea_push_phone	
	,           ip.idea_push_status
    ,           ip.idea_push_date	
    ,			ip.date_created 
    ,			ip.user_created
    ,			ip.date_updated
    ,			ip.user_updated
    FROM		bs_idea_push ip
    WHERE		ip.idea_push_id =  IFNULL(i_idea_push_id,ip.idea_push_id) 
    AND			ip.idea_id =  IFNULL(i_idea_id,ip.idea_id) 
    AND			ip.trader_id =  IFNULL(i_trader_id,ip.trader_id) 
    AND			ip.record_status_id = statusId
    ORDER BY 	ip.date_created DESC;
end $$

DELIMITER ;