DROP PROCEDURE IF EXISTS  bs_trader_ledger_upi;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_trader_ledger_upi`
				(
			 in		i_trader_ledger_id			INT        
			,IN		i_trader_id           		INT
			,IN		i_payment_id    			INT  
			,IN		i_trx_type_id    			INT 
            ,IN		i_trx_reference				VARCHAR(40)
            ,IN		i_trx_date					date
            ,IN		i_start_balance				INT
			,IN   	i_trx_amount				INT
			,IN   	i_end_balance				INT
            ,IN     i_current_record_id         INT
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
	DECLARE currentRecordId     INT;
    
	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
    SET currentRecordId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'YES');
    SELECT payment_id INTO paymentId FROM bs_payment WHERE user_id = i_trader_id;
    
    INSERT INTO bs_trader_ledger
    (
		 trader_id
		,payment_id
		,trx_type_id
		,trx_reference
		,trx_date
		,start_balance
		,trx_amount
		,end_balance
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
		,paymentId		
		,i_trx_type_id		
		,i_trx_reference	
		,i_trx_date		
		,i_start_balance	
		,i_trx_amount		
		,i_end_balance
        ,currentRecordId
		,IFNULL(i_record_status_id,statusId)
		,i_date_created		
		,IFNULL(i_user_created,-1)		
		,i_date_updated		
		,IFNULL(i_user_updated,-1)		
    );
   

end $$

DELIMITER ;