DROP PROCEDURE IF EXISTS  bs_idea_rating_upi;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_idea_rating_upi`
				(
			 in		i_idea_rating_id			INT
			,IN		i_idea_id       			INT          
			,IN		i_trader_id           		INT
			,IN		i_idea_rating				VARCHAR(40)
			,IN		i_idea_rating_note			VARCHAR(180)
			,IN		i_record_status_id			INT
			,IN		i_date_created				DATETIME
			,IN		i_user_created				INT
			,IN		i_date_updated				DATETIME
			,IN		i_user_updated				INT
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;
    DECLARE traderId			INT;
    
	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	SELECT trader_id INTO traderId FROM bs_idea_rating WHERE trader_id=i_trader_id AND idea_id = i_idea_id;
                    
    IF traderId IS NULL THEN
    
    INSERT INTO bs_idea_rating
    (
		 idea_id
		,trader_id
		,idea_rating
		,idea_rating_note
		,record_status_id
		,date_created
		,user_created
		,date_updated
		,user_updated
    )
    value
    (
		 i_idea_id       	
		,i_trader_id         
		,i_idea_rating		
		,i_idea_rating_note
		,i_record_status_id	
		,i_date_created		
		,i_user_created		
		,i_date_updated		
		,i_user_updated		

    
    );
    ELSE
		UPDATE bs_idea_rating
		SET		idea_id = i_idea_id
		,		trader_id = i_trader_id
		,		idea_rating = i_idea_rating
		,		idea_rating_note = i_idea_rating_note
		,		record_status_id = i_record_status_id
		,		date_updated = i_date_updated
		,		user_updated = i_user_updated
        WHERE	idea_rating_id = i_idea_rating_id
        ;
    
    END IF;

end $$

DELIMITER ;