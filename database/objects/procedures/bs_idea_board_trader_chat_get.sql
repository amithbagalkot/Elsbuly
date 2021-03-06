DROP PROCEDURE IF EXISTS  bs_idea_board_trader_chat_get;

-- --------------------------------------------------------------------------------
-- Created Date : 2nd Nov 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

  
CREATE PROCEDURE `bs_idea_board_trader_chat_get`
				(
					IN		i_discussion_board_id        INT,
                    IN		i_idea_id					 INT,
                    IN		i_user_id					 INT
                   
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
    
	SELECT * FROM bs_idea_board_trader_chat WHERE discussion_board_id = i_discussion_board_id AND idea_id = i_idea_id AND user_id = i_user_id ;
    
end $$

DELIMITER ;