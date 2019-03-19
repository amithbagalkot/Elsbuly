DROP PROCEDURE IF EXISTS bs_trader_preference_get;

DELIMITER $$

CREATE PROCEDURE bs_trader_preference_get(
IN  i_user_id						INT
)

BEGIN
  SELECT
    tp.trader_id,
    tp.profile_display_id,
	tp.advisor_display_id,
	tp.idea_display_id,
	tp.push_notification_id,
	tp.email_notification_id,
	tp.text_notification_id	
  FROM 
    bs_trader_preference as tp WHERE tp.advisor_id = i_user_id;
 
END $$
DELIMITER ;

