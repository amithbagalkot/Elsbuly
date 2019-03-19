DROP PROCEDURE IF EXISTS  bs_user_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_user_get` 
			(
				      i_user_name      	VARCHAR(50),
                      i_password		VARCHAR(50)
			)
            
begin

	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;
    DECLARE userId				INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
    SET userId=(SELECT bs_user_validate(i_user_name,i_password));

	IF userId IS NULL THEN
		SELECT userId;
	ELSE
		SELECT		u.user_id  	
		,   		u.country_id
		,   		u.location						
		,   		u.telephone						
		,   		u.user_name                   		
		,   		u.password                    	
		,			u.salt						 	        
		,   		u.password_reset_token			
		,			u.password_reset_time				
		,   		u.otp_code						
		,			u.otp_counter
        ,			u.otp_sent_date
        ,			u.otp_resent_date
		,   		u.email_id 	                   	
		,			u.first_name				 		
		,			u.last_name				 		
		,			u.middle_name				 		
		,   		u.secret_code						  
		, 			u.company_name 					
		,   		u.display_name
        ,			u.display_picture_file_name
        ,			u.picture_file_name
		,			u.gender_id						
		,   		u.date_of_birth					
		,   		u.user_type_id                	
		,   		u.user_source_id                	
		,			u.employee_number				 	
		,   		u.employee_type_id			
		,   		u.user_role_id			
		,   		u.idea_price		    			
		,   		u.idea_cost		    	    	
		,   		u.idea_push_preference_id    		
		,   		u.employee_status_id         		
		,   		u.advisor_status_id          		
		,   		u.trader_status_id            	
		,   		u.record_status_id		    	
		,			u.date_created					
		,			u.user_created					
		,			u.date_updated					
		,			u.user_updated					
		FROM    	bs_user u
		WHERE	   	u.user_id = userId;
	END IF;
end $$

DELIMITER ;
