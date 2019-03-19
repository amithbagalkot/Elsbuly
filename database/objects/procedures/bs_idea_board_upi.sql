DROP PROCEDURE IF EXISTS  bs_idea_board_upi;
-- --------------------------------------------------------------------------------
-- Created Date : 2nd Nov 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

  
CREATE PROCEDURE `bs_idea_board_upi`
				(
                    IN      i_idea_board_id            		INT,
					IN		i_idea_id        				INT,
					IN      i_idea_board_number				INT,
                    IN      i_idea_board_limit      			INT,
                    IN      i_idea_board_name         		VARCHAR(50),
                    IN 		i_idea_status					VARCHAR(50),
                    IN		i_record_status_code				INT,
                    IN      i_date_created   				DATETIME,
                    IN 		i_user_created					INT,
                    IN 		i_date_updated					DATETIME,
                    in		i_user_updated					INT
				)
begin
	
	DECLARE activeStatus					VARCHAR(50);
	DECLARE statusId						INT;
    DECLARE ideaId							INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	-- SET ideaId = (SELECT idea_id FROM bs_idea_board WHERE idea_id = i_idea_id);
  
    
	INSERT INTO bs_idea_board (
			 idea_board_id     
            ,idea_id        	
            ,idea_board_number	
            ,idea_board_limit  
            ,idea_board_name   
            ,idea_board_status		
            ,record_status_id	
            ,date_created   	
            ,user_created		
            ,date_updated		
			,user_updated
            )
			VALUE (
             i_idea_board_id     
            ,i_idea_id        	
            ,i_idea_board_number	
            ,i_idea_board_limit  
            ,i_idea_board_name   
            ,i_idea_status		
            ,statusId	
            ,i_date_created   	
            ,IFNULL(i_user_created,-1)		
            ,i_date_updated		
            ,IFNULL(i_user_updated,-1)		
			);
end $$

DELIMITER ;