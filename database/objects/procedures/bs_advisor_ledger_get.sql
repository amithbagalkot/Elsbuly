DROP PROCEDURE IF EXISTS  bs_advisor_ledger_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_advisor_ledger_get`
				(
					IN      i_advisor_ledger_id		INT,
                    IN		i_advisor_id			INT
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
	SELECT		al.advisor_ledger_id
	,			al.advisor_id
	,			al.payment_id
	,			al.trx_type_id
	,			al.trx_reference
	,			al.trx_date
	,			al.start_balance
	,			al.trx_amount
	,			al.end_balance
	,			al.current_record_id	
    ,			al.date_created 
    ,			al.user_created
    ,			al.date_updated
    ,			al.user_updated
    FROM		bs_advisor_ledger al
    WHERE		al.advisor_ledger_id =  IFNULL(i_advisor_ledger_id,al.advisor_ledger_id) 
    AND			al.advisor_id =  IFNULL(i_advisor_id,al.advisor_id)   
    AND			al.record_status_id = statusId
    ;
end $$

DELIMITER ;