DROP PROCEDURE IF EXISTS  bs_idea_board_trader_chat_upi;

-- --------------------------------------------------------------------------------
-- Created Date : 2nd Nov 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

  
CREATE PROCEDURE `bs_idea_board_trader_chat_upi`
				(
                    IN      sl_no            			INT,
					IN		i_user_id        			INT,
					IN      i_idea_id					INT,
                    IN      i_user_name      			VARCHAR(50),
                    IN      i_email         		 	VARCHAR(50),
                    IN 		i_discussion_board_type		VARCHAR(50),
                    IN		i_discussion_board_id		INT,
                    IN      i_date_created   			DATETIME
                   
				)
begin
	
	DECLARE activeStatus					VARCHAR(50);
	DECLARE statusId						INT;
    DECLARE ii_user_id						INT;
    DECLARE ii_disussion_board_type        	VARCHAR(50);

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
    
    SELECT user_id INTO ii_user_id FROM bs_idea_board_trader_chat WHERE user_id = i_user_id AND discussion_board_type = i_discussion_board_type;
    
    IF ii_user_id IS NULL THEN 
	INSERT INTO bs_idea_board_trader_chat values(sl_no,i_user_id, i_idea_id,i_user_name,i_email, i_discussion_board_type, i_discussion_board_id, i_date_created);
    end IF;
end $$

DELIMITER ;