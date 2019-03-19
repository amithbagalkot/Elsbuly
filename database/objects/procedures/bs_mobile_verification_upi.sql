DROP PROCEDURE IF EXISTS  bs_mobile_verification_upi;

-- --------------------------------------------------------------------------------
-- Created Date : 29th aug 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_mobile_verification_upi`
				(	
					 IN      i_mobile_verfication_id	INT
,					 IN      i_mobile_number   			VARCHAR(50)
,                    IN      i_country_id        		INT
,                    IN 	 i_otp_code					VARCHAR(20)
,                    IN		 i_otp_counter				INT
,                    IN		 i_otp_sent_date			DATETIME
,					 IN		 i_otp_resent_date			DATETIME
,					 IN 	 i_record_status_id			INT
,                    IN      i_date_created    			DATETIME
,					 IN      i_user_created				INT
,                    IN      i_date_updated    			DATETIME
,                    IN		 i_user_updated				INT
				)
begin
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;
	
	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
    
    IF NOT EXISTS(SELECT mobile_number FROM bs_mobile_verification where mobile_number=i_mobile_number) THEN
	 
     INSERT  INTO bs_mobile_verification(
      mobile_number
     ,country_id
     ,otp_code
     ,otp_counter
     ,otp_sent_date
     ,otp_resent_date
     ,record_status_id
     ,date_created
     ,user_created
     ,date_updated
     ,user_updated
     ) 
     value(
      i_mobile_number
     ,i_country_id
     ,i_otp_code
     ,i_otp_counter
     ,i_otp_sent_date
     ,i_otp_resent_date
     ,IFNULL(i_record_status_id, statusId)
     ,i_date_created
	 ,IFNULL(i_user_created,-1)
	 ,i_date_updated
	 ,IFNULL(i_user_updated,-1)
     );
	
    ELSE 
    SET SQL_SAFE_UPDATES = 0;
      UPDATE   bs_mobile_verification 
      SET      otp_code      = i_otp_code
      ,		   otp_counter   = i_otp_counter
      ,        date_updated  = i_date_updated
      ,		   otp_resent_date = i_otp_resent_date
      where    bs_mobile_verification.mobile_number = i_mobile_number
      ;
	end if; 
end $$

DELIMITER ;

/*first we need to check the mobilenumber is present in the table or not 
if its not exist then we need to insert the new record 
if its exist then we need to update the row of specified mobilenumber */


