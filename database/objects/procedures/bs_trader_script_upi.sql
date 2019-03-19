DROP PROCEDURE IF EXISTS  bs_trader_script_upi;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_trader_script_upi`
				(
			 in		i_trader_script_id			INT        
			,IN		i_trader_id           		INT
			,IN		i_script_id	    			INT  
			,IN		i_record_status_id			INT
			,IN		i_date_created				DATETIME
			,IN		i_user_created				INT
			,IN		i_date_updated				DATETIME
			,IN		i_user_updated				INT
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
    IF i_trader_script_id IS NULL THEN
    
    INSERT INTO bs_trader_script
    (
		 trader_id
		,script_id
		,record_status_id
		,date_created
		,user_created
		,date_updated
		,user_updated
    )
    value
    (
		 i_trader_id         
		,i_script_id
		,i_record_status_id	
		,i_date_created		
		,i_user_created		
		,i_date_updated		
		,i_user_updated		

    
    );
    ELSE
		UPDATE bs_trader_script
		SET		trader_id = i_trader_id
		,		script_id = i_script_id
		,		record_status_id = i_record_status_id
		,		date_updated = i_date_updated
		,		user_updated = i_user_updated
        WHERE	trader_script_id = i_trader_script_id
        ;
    
    END IF;

end $$

DELIMITER ;