DROP PROCEDURE IF EXISTS  bs_trader_ledger_get;

-- --------------------------------------------------------------------------------
-- Created Date : 12th March 2019
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_trader_ledger_get`
				(
					IN      i_payment_id		INT,
                    IN		i_trader_id				INT
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
	SELECT		tl.trader_ledger_id
	,			tl.trader_id
	,			tl.payment_id
	,			tl.trx_type_id
	,			tl.trx_reference
	,			tl.trx_date
	,			tl.start_balance
	,			tl.trx_amount
	,			tl.end_balance
	,			tl.current_record_id	
    ,			tl.date_created 
    ,			tl.user_created
    ,			tl.date_updated
    ,			tl.user_updated
    FROM		bs_trader_ledger tl
    WHERE		tl.trader_id =  IFNULL(i_trader_id,tl.trader_id)   
    AND			tl.record_status_id = statusId
    ;
end $$

DELIMITER ;