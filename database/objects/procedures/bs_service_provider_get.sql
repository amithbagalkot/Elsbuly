
DROP PROCEDURE IF EXISTS  bs_sms_api_auth;

-- --------------------------------------------------------------------------------
-- Created Date : 29th aug 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_sms_api_auth`
				(
					IN      username		VARCHAR(30),
                    IN      password        VARCHAR(15)
				)
begin
	 
	SELECT		m.username
	,			m.password
    FROM		bs_mvayyo_auth m;
end $$

DELIMITER ;