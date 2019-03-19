DROP PROCEDURE IF EXISTS  bs_trader_advisor_upi;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_trader_advisor_upi`
				(
			 IN		i_trader_advisor_id			INT        
			,IN		i_trader_id           		INT
			,IN		i_advisor_id       			INT 
            ,IN		i_current_record_id			INT
			,IN		i_record_status_id			INT
			,IN		i_date_created				DATETIME
			,IN		i_user_created				INT
			,IN		i_date_updated				DATETIME
			,IN		i_user_updated				INT
            ,OUT	o_return_value				VARCHAR(100)
				)
begin
	
	DECLARE activeStatus		  VARCHAR(50);
	DECLARE statusId			  INT;
	DECLARE ii_trader_advisor_id  INT;
    DECLARE ii_record_status_id   INT;
    
	SET activeStatus = 'ACTIVE';
    
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');

    SELECT lookup_value_id INTO ii_record_status_id FROM bs_lookup_value WHERE lookup_code = 'INACTIVE';
    
	SELECT trader_advisor_id INTO ii_trader_advisor_id FROM bs_trader_advisor WHERE trader_id = i_trader_id AND advisor_id=i_advisor_id AND record_status_id=statusId;
    
    IF ii_trader_advisor_id IS NULL THEN
		-- IF NOT EXISTS(SELECT trader_advisor_id FROM bs_trader_advisor WHERE trader_id=i_trader_id AND advisor_id=i_advisor_id AND record_status_id=statusId) THEN
			INSERT INTO bs_trader_advisor
			(
				 trader_id
				,advisor_id
                ,current_record_id
				,record_status_id
				,date_created
				,user_created
				,date_updated
				,user_updated
			)
			value
			(
				 i_trader_id         
				,i_advisor_id
                ,i_current_record_id
				,statusId	
				,i_date_created		
				,i_user_created		
				,i_date_updated		
				,i_user_updated
			);
			SET o_return_value= 1 ;
		ELSE
			SET o_return_value= -1 ;
		END IF;
  --  ELSE
		--  UPDATE bs_trader_advisor

		-- SET		record_status_id  = i_record_status_id
		-- ,		date_created      = i_date_created
	-- ,		user_updated      = i_user_updated
     --   WHERE	trader_advisor_id = ii_trader_advisor_id
       -- ;
   -- END IF;

end $$

DELIMITER ;