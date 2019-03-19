DROP PROCEDURE IF EXISTS  bs_idea_board_trader_upi;
-- --------------------------------------------------------------------------------
-- Created Date : 2nd Nov 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

  
CREATE PROCEDURE `bs_idea_board_trader_upi`
				(
                    IN      i_idea_board_trader_id      INT,
					IN		i_idea_id        			INT,
					IN      i_idea_board_id				INT,
                    IN      i_trader_id      			INT,
                    IN      i_display_name         		VARCHAR(50),
                    IN		i_record_status_id			INT,
                    IN      i_date_created   			DATETIME,
                    IN 		i_user_created				INT,
                    IN 		i_date_updated				DATETIME,
                    in		i_user_updated				INT
				)
begin
	
	DECLARE activeStatus					VARCHAR(50);
	DECLARE statusId						INT;
    DECLARE ideaId							INT;
	DECLARE traderId						INT;
    DECLARE recordStatusId					INT;
    
	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
    SET recordStatusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'INACTIVE');
    
    
   -- SELECT idea_id INTO ideaId FROM bs_idea_board WHERE idea_id = i_idea_id;
    SELECT trader_id INTO traderId FROM bs_idea_board_trader WHERE trader_id = i_trader_id AND idea_id = i_idea_id AND idea_board_id = i_idea_board_id ;
   
   IF traderId IS NULL THEN 
	INSERT INTO bs_idea_board_trader (
              idea_id        		
             ,idea_board_id			
             ,trader_id      		
             ,display_name         	
             ,record_status_id		
             ,date_created   		
             ,user_created			
             ,date_updated			
             ,user_updated			
             )
			VALUE (
              i_idea_id        		
             ,i_idea_board_id			
             ,i_trader_id
             ,i_display_name    	
             ,statusId
             ,i_date_created   		
             ,IFNULL(i_user_created,-1)		
             ,i_date_updated		
             ,IFNULL(i_user_updated,-1)
			);
            
            ELSE UPDATE bs_idea_board_trader
            SET record_status_id = recordStatusId
            WHERE idea_id = i_idea_id 
            AND trader_id = i_trader_id
            AND idea_board_id = i_idea_board_id
            AND user_updated = i_user_updated;
            
	END IF;
end $$

DELIMITER ;
