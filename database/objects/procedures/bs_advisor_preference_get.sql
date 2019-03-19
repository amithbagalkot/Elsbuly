DROP PROCEDURE IF EXISTS bs_advisor_preference_get;

DELIMITER $$

CREATE PROCEDURE bs_advisor_preference_get(
IN  i_user_id						INT
)

BEGIN
  SELECT
    ap.advisor_id,
    ap.profile_display_id,
	ap.trader_display_id,
	ap.idea_display_id,
	ap.push_notification_id,
	ap.email_notification_id,
	ap.text_notification_id	
  FROM 
    bs_advisor_preference as ap WHERE ap.advisor_id = i_user_id;
 
END $$
DELIMITER ;

