DROP PROCEDURE IF EXISTS  bs_user_upi;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_user_upi`
				(
			 IN		i_user_id                     	INT  			
			,IN		i_country_id					INT  			
			,IN		i_location						VARCHAR(50)		
			,IN		i_telephone						VARCHAR(20)		
			,IN		i_user_name                   	VARCHAR(100)		
			,IN		i_password                    	VARCHAR(20) 
            ,IN		i_salt							VARCHAR(20)
            ,IN 	i_password_reset_token			VARCHAR(40)
            ,IN		i_password_reset_time			DATETIME
            ,IN		i_otp_code						VARCHAR(11)
            ,IN		i_otp_counter						INT
            ,IN		i_otp_sent_date		 			DATETIME
            ,IN		i_otp_resent_date					DATETIME
			,IN		i_email_id 	                   	VARCHAR(40) 	
			,IN		i_first_name				 	VARCHAR(50)		
			,IN		i_last_name				 		VARCHAR(50)		
			,IN		i_middle_name				 	VARCHAR(50)	
            ,IN		i_picture_file_name				VARCHAR(50)
			,IN		i_secret_code					VARCHAR(1000)		
			,IN		i_company_name 					VARCHAR(120)	
			,IN		i_display_name					VARCHAR(15) 
            ,IN  	i_display_picture_file_name		VARCHAR(50)
			,IN		i_gender_id						INT      		
			,IN		i_date_of_birth					DATETIME		
			,IN		i_user_type_code                VARCHAR(50) 			
			,IN		i_user_source_code              VARCHAR(100) -- Pass the login source as code from Look up value(ANDROID/IPHONE/APPLICATION)			
			,IN		i_employee_number				VARCHAR(50)		
			,IN		i_employee_type_id				INT   			
			,IN		i_user_role_id				INT   			
			,IN		i_idea_price		    		DECIMAL(10,2)	
			,IN		i_idea_cost		    	    	DECIMAL(10,2)  
			,IN		i_idea_push_preference_id    	INT   			
			,IN		i_employee_status_id         	INT   			
			,IN		i_advisor_status_id          	INT  			
			,IN		i_trader_status_id            	INT  		  	
			,IN		i_record_status_id		    	INT	-- Normally null. Only from admin panel need to pass id		
			,IN		i_user_updated					INT
            ,IN		i_email_verification_token		VARCHAR(250)
            ,OUT	o_return_value					VARCHAR(100)
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;
    DECLARE userSourceId			INT;
    DECLARE user_type_id			INT;
    DECLARE user_role_id			INT;
    DECLARE countryId				INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
    SET countryId =(SELECT country_id FROM bs_country WHERE telephone_code = i_country_id);
    SET userSourceId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = i_user_source_code);
    SET user_type_id = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = i_user_type_code);
    IF i_user_type_code = 'TRADER' THEN
		SET user_role_id = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ROLE_TRADER');
    END IF;
	IF i_user_type_code = 'ADVISOR' THEN
		SET user_role_id = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ROLE_ADVISOR');
    END IF;
	IF i_user_type_code = 'EMPLOYEE' THEN
		SET user_role_id = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ROLE_ASSOCIATE');
    END IF;
	
    IF i_user_id IS NULL THEN
    
		IF NOT EXISTS(SELECT user_id FROM bs_user WHERE user_name=i_user_name AND user_type_id=user_type_id) THEN
			
            IF NOT EXISTS(SELECT user_id FROM bs_user WHERE email_id=i_email_id AND user_type_id=user_type_id) THEN
    
				INSERT INTO bs_user
				(
					 country_id
					,telephone
					,user_name
					,password
                    ,salt					
                    ,password_reset_token	
                    ,password_reset_time	
                    ,otp_code				
                    ,otp_counter			
                    ,otp_sent_date		 	
                    ,otp_resent_date
					,email_id
					,first_name
					,last_name
					,middle_name
                    ,picture_file_name
                    ,display_picture_file_name
					,gender_id
					,date_of_birth
					,user_type_id
					,user_source_id
                    ,user_role_id
					,idea_push_preference_id
					,employee_status_id
					,advisor_status_id
					,trader_status_id
					,record_status_id
					,date_created
					,user_created
					,date_updated
					,user_updated
                    ,email_verification_token
				)
				value
				(
					 countryId
					,i_telephone
					,i_user_name
					,MD5(i_password)
                    ,i_salt					
                    ,i_password_reset_token	
                    ,i_password_reset_time	
                    ,i_otp_code				
                    ,i_otp_counter			
                    ,i_otp_sent_date		 	
                    ,i_otp_resent_date		
					,i_email_id
					,i_first_name
					,i_last_name
					,i_middle_name
                    ,i_picture_file_name
                    ,i_display_picture_file_name
					,i_gender_id
					,i_date_of_birth
					,user_type_id
					,userSourceId
                    ,user_role_id
					,i_idea_push_preference_id
					,i_employee_status_id
					,i_advisor_status_id
					,i_trader_status_id
					,IFNULL(i_record_status_id,statusId)
					,NOW()
					,IFNULL(i_user_updated,-1)
					,NOW()
					,IFNULL(i_user_updated,-1)
                    ,i_email_verification_token
				);
                SET o_return_value= 'USER_CREATED' ;
			ELSE
				SET o_return_value= 'EMAILID_EXISTS' ;
            END IF;
		ELSE
			SET o_return_value= 'USERNAME_EXISTS' ;
        END IF;
    ELSE
		UPDATE 	bs_user
		SET		country_id = i_country_id
		,		location = i_location
		,		telephone = i_telephone
		,		email_id = i_email_id
		,		first_name = i_first_name
		,		last_name = i_last_name
		,		middle_name = i_middle_name
		,		company_name = i_company_name
		,		display_name = i_display_name
		,		gender_id = i_gender_id
		,		date_of_birth = i_date_of_birth
		,		employee_number = i_employee_number
		,		employee_type_id = i_employee_type_id
		,		user_role_id = i_user_role_id
		,		idea_price = i_idea_price
		,		idea_cost = i_idea_cost
		,		idea_push_preference_id = i_idea_push_preference_id
		,		employee_status_id = i_employee_status_id
		,		advisor_status_id = i_advisor_status_id
		,		trader_status_id = i_trader_status_id
		,		record_status_id = IFNULL(i_record_status_id,record_status_id)
		,		date_updated = NOW()
		,		user_updated = i_user_updated
        WHERE	user_id = i_user_id
        ;
        SET o_return_value= 'USER_UPDATED' ;
    
    END IF;

end $$

DELIMITER ;