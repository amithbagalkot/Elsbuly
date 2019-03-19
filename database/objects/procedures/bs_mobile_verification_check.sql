DROP PROCEDURE IF EXISTS bs_mobile_verification_check;

-- --------------------------------------------------------------------------------
-- Created Date : 09th SEP 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE bs_mobile_verification_check(
	IN i_mobile_number VARCHAR(20),
	OUT RESULT INT
    )

BEGIN

IF NOT EXISTS(SELECT telephone From bs_user where telephone = i_mobile_number) THEN
 IF NOT EXISTS(SELECT mobile_number FROM bs_mobile_verification WHERE mobile_number = i_mobile_number) THEN
    SET RESULT=-1;
 ELSE 
   SET RESULT= 1;
 end IF; 
ELSE
  SET RESULT=1;
 end IF; 
end $$

DELIMITER ;