DROP PROCEDURE IF EXISTS  bs_mobile_verification_get;

-- --------------------------------------------------------------------------------
-- Created Date : 29th aug 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_mobile_verification_get`
				(
					IN      i_mobile_number	VARCHAR(50)
				)
BEGIN
	DECLARE date_updated DATETIME;
     SET date_updated = (SELECT date_updated FROM   bs_mobile_verification where mobile_number=i_mobile_number);
	IF date_updated IS NULL THEN 
	SELECT mobile_number, country_id, otp_code, otp_sent_date FROM bs_mobile_verification WHERE bs_mobile_verification.mobile_number=i_mobile_number;
ELSE 
    SELECT mobile_number,country_id, otp_code, otp_resent_date FROM bs_mobile_verification WHERE bs_mobile_verification.mobile_number=i_mobile_number;
 end IF;
 
end $$

DELIMITER ;
