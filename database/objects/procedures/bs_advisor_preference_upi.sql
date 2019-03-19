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
    UPDATE bs_advisor_preference
    SET profile_display_id 			= IFNULL(i_profile_display_id, profile_display_id),
		trader_display_id 			= IFNULL( i_trader_display_id, trader_display_id),
        idea_display_id 			= IFNULL(i_idea_display_id, idea_display_id),
        push_notification_id 		= IFNULL(i_push_notification_id, push_notification_id),
        email_notification_id 		= IFNULL(i_email_notification_id, email_notification_id),
        text_notification_id 		= IFNULL(i_text_notification_id, text_notification_id)
        WHERE advisor_preference_id = i_advisor_preference_id;
 END IF;
END $$
DELIMITER ;