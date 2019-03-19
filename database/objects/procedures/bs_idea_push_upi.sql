DROP PROCEDURE IF EXISTS  bs_idea_push_upi;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_idea_push_upi`
				(
			 in		i_idea_push_id				INT
			,IN		i_idea_id       			INT          
			,IN		i_trader_id           		INT
			,IN		i_idea_string				VARCHAR(2000)
			,IN		i_idea_push_phone			VARCHAR(20)
			,IN		i_idea_push_status          VARCHAR(40)
			,IN		i_idea_push_date			DATETIME
			,IN		i_record_status_id			INT
			,IN		i_date_created				DATETIME
			,IN		i_user_created				INT
			,IN		i_date_updated				DATETIME
			,IN		i_user_updated				INT
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;
	DECLARE paymentId			INT;
    DECLARE ideaPrice 			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
     SELECT payment_id INTO paymentId FROM bs_payment WHERE user_id = i_trader_id;
     SELECT price_at_idea_open INTO ideaPrice FROM bs_idea WHERE idea_id = i_idea_id;

    
    INSERT INTO bs_idea_push
    (
		 idea_id
		,trader_id
		,idea_string
		,idea_push_phone
		,idea_push_status
		,idea_push_date
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
		,i_idea_string		
		,i_idea_push_phone	
		,i_idea_push_status  
		,i_idea_push_date	
		,IFNULL(i_record_status_id,statusId)
		,i_date_created		
		,IFNULL(i_user_updated,-1)	
		,i_date_updated		
		,IFNULL(i_user_updated,-1)		
);
		
	SET SQL_SAFE_UPDATES = 0;
    
    UPDATE bs_payment  SET payment_amount = payment_amount - ideaPrice  
	WHERE	payment_id = IFNULL(paymentId, payment_id) 
    AND		user_id =  IFNULL(i_trader_id, user_id) 
    ;

end $$

DELIMITER ;