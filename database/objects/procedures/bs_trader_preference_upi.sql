<<<<<<< HEAD:database/objects/procedures/bs_trader_preference_upi.sql
DROP PROCEDURE IF EXISTS bs_trader_preference_upi;
-- ALL THE COLUMNS NAMES NEEDS TO BE CHANGED
DELIMITER $$

CREATE PROCEDURE bs_trader_preference_upi(
IN  i_user_id						INT,
IN  i_idea_preference 				BOOLEAN,
IN  i_advisor_preference   			BOOLEAN,
IN  i_profile_preference			BOOLEAN,
IN  i_push_notification				BOOLEAN,
IN  i_email_notification			BOOLEAN,
IN  i_sms_notification				BOOLEAN
=======
DROP PROCEDURE IF EXISTS bs_advisor_preference_upi;

DELIMITER $$

CREATE PROCEDURE bs_advisor_preference_upi(
		IN  i_advisor_preference_id				INT,
		IN  i_profile_display_id 				INT,
		IN  i_trader_display_id  				INT,
		IN  i_idea_display_id					INT,
		IN  i_push_notification_id				INT,
		IN  i_email_notification_id				INT,
		IN  i_text_notification_id				INT,
		IN	i_record_status_id					INT,
        IN  i_date_created						DATETIME,
        IN  i_user_created						INT,
        IN  i_date_updated						DATETIME,
        IN  i_user_updated						INT
>>>>>>> publish:database/objects/procedures/bs_preference_upi.sql
)

BEGIN
   DECLARE advisorPreferenceId	 INT;
   DECLARE statusId			INT;
    
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
    SELECT advisor_preference_id INTO advisorPreferenceId FROM bs_advisor_preference WHERE advisor_preference_id = i_advisor_preference_id;
    
  IF advisor_preference_id  IS NULL THEN 
    INSERT INTO bs_advisor_preference(
			 advisor_preference_id	
            ,profile_display_id 	
            ,trader_display_id  	
            ,idea_display_id		
            ,push_notification_id	
            ,email_notification_id	
            ,text_notification_id	
            ,record_status_id		
            ,date_created			
            ,user_created			
            ,date_updated			
            ,user_updated			
    
<<<<<<< HEAD:database/objects/procedures/bs_trader_preference_upi.sql
  IF ii_user_id  IS NULL THEN 
	/*IF NOT EXISTS(SELECT user_id FROM bs_preferences WHERE user_id = i_user_id) THEN */ 
    INSERT INTO bs_trader_preference(
    user_id,
    idea_preference,
    advisor_preference,
    profile_preference,
    push_notification,
    email_notification,
    sms_notification
=======
>>>>>>> publish:database/objects/procedures/bs_preference_upi.sql
    )
    VALUES(
 
			i_advisor_preference_id	
            ,i_profile_display_id 	
            ,i_trader_display_id  	
            ,i_idea_display_id		
            ,i_push_notification_id	
            ,i_email_notification_id	
            ,i_text_notification_id	
            ,statusId		
            ,i_date_created			
            ,i_user_created			
            ,i_date_updated			
            ,i_user_updated			
    );
ELSE
<<<<<<< HEAD:database/objects/procedures/bs_trader_preference_upi.sql
    UPDATE bs_trader_preference
    SET idea_preference = IFNULL(i_idea_preference, idea_preference),
		advisor_preference = IFNULL( i_advisor_preference, advisor_preference),
        profile_preference = IFNULL(i_profile_preference, profile_preference),
        push_notification = IFNULL(i_push_notification, push_notification),
        email_notification = IFNULL(i_email_notification, email_notification),
        sms_notification = IFNULL(i_sms_notification, sms_notification)
        WHERE user_id = i_user_id;
=======
    UPDATE bs_advisor_preference
    SET profile_display_id = IFNULL(i_profile_display_id, profile_display_id),
		trader_display_id = IFNULL( i_trader_display_id, trader_display_id),
        idea_display_id = IFNULL(i_idea_display_id, idea_display_id),
        push_notification_id = IFNULL(i_push_notification_id, push_notification_id),
        email_notification_id = IFNULL(i_email_notification_id, email_notification_id),
        text_notification_id = IFNULL(i_text_notification_id, text_notification_id)
        WHERE advisor_preference_id = i_advisor_preference_id;
>>>>>>> publish:database/objects/procedures/bs_preference_upi.sql
 END IF;
END $$
DELIMITER ;