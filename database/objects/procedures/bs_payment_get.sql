DROP PROCEDURE IF EXISTS  bs_payment_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_payment_get`
				(
					IN      i_payment_id		INT,
                    IN      i_user_id			INT
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
	
	SELECT		bp.payment_id
	,			bp.user_id
	,			bp.country
	,			bp.telephone
	,			bp.user_type_id
	,			bp.payment_currency
	,			bp.payment_amount
	,			bp.payment_date
	,			bp.payment_reference
	,			bp.payment_source
	,			bp.payment_status
    FROM		bs_payment bp
    INNER JOIN	bs_user bu ON bp.user_id=bu.user_id
    WHERE		bp.payment_id = IFNULL(i_payment_id,bp.payment_id) 
    AND			bp.user_id =  IFNULL(i_user_id,bp.user_id) 
    ORDER BY 	bp.payment_id ASC;
end $$

DELIMITER ;