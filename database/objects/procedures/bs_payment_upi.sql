 DROP PROCEDURE IF EXISTS  bs_payment_upi;

-- --------------------------------------------------------------------------------
-- Created Date : 16th AUG 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_payment_upi`
				(
			         IN  i_payment_id          INT    			
                    ,IN  i_user_id             INT			    
					,IN  i_country	           VARCHAR(20)		
                    ,IN  i_telephone		   VARCHAR(20) 	
                    ,IN	 i_user_type_id	       INT				
                    ,IN	 i_payment_currency    VARCHAR(3)		
					,IN	 i_payment_amount	   INT				
                    ,IN  i_payment_date        DATE					    
                    ,IN  i_payment_reference   VARCHAR(25)     
					,IN  i_payment_source      VARCHAR(45)     
                    ,IN  i_payment_status      INT	
                    ,IN	 i_date_created		   DATETIME
					,IN	 i_user_created		   INT
					,IN	 i_date_updated		   DATETIME
					,IN	 i_user_updated		   INT
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;
    DECLARE start_balance       INT;
    DECLARE end_balance         INT;
    DECLARE paymentId       	INT;
    DECLARE paymentAmount       INT;
    
	SET activeStatus  = 'ACTIVE';
	SET statusId      = (SELECT lookup_value_id FROM bs_lookup_value  WHERE lookup_code = 'ACTIVE');
   
	SELECT payment_id into paymentId FROM bs_payment WHERE user_id = i_user_id;
    SELECT payment_amount into paymentAmount from bs_payment WHERE user_id = i_user_id;
    
 IF paymentId IS NULL THEN
    
   INSERT INTO bs_payment
    (         user_id         				
         ,    country						
         ,    telephone						
         ,	  user_type_id					
         ,	  payment_currency				
         ,	  payment_amount					
         ,    payment_date            				    
         ,    payment_reference           	
         ,    payment_source              	
         ,    payment_status
         ,	  record_status_id
         ,    date_created
		 ,    user_created
		 ,    date_updated
		 ,    user_updated
    )
    value
    (
		 i_user_id		
		,i_country	
		,i_telephone	
		,i_user_type_id		
		,i_payment_currency	
		,i_payment_amount		 			
	    ,i_payment_date       					    
		,i_payment_reference       
		,i_payment_source          
		,i_payment_status
        ,statusId
		,i_date_created
        ,i_user_created
        ,i_date_updated
        ,i_user_updated
		
    );

 call bs_trader_ledger_upi(paymentId,i_user_id,1,i_user_type_id,i_payment_reference,i_payment_date,null,i_payment_amount,null,1,statusId,i_date_created,i_user_created,i_date_updated,i_user_updated);

    ELSE
	SET SQL_SAFE_UPDATES = 0;
     UPDATE bs_payment 
     SET 	
		 payment_amount = paymentAmount+i_payment_amount
		,date_updated   = i_date_updated
		,user_updated   = i_user_updated
        ,payment_status = i_payment_status
	WHERE payment_id   = paymentId 
        ;
        
        call bs_trader_ledger_upi(paymentId,i_user_id,1,i_user_type_id,i_payment_reference,i_payment_date,null,i_payment_amount,null,1,statusId,i_date_created,i_user_created,i_date_updated,i_user_updated);
        
     END IF;

end $$

DELIMITER ;



















