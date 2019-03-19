DROP PROCEDURE IF EXISTS bs_user_notification_subscription_get;

-- CREATE ON 16-11-2018

DELIMITER $$

CREATE PROCEDURE bs_user_notification_subscription_get(
	IN i_user_id 				INT,
    OUT o_return_value 			VARCHAR(100)
)

/*

PRASAD
We DO NOT NEED THIS PROCEDURE bs_check_user_subscription 
	IN i_user_id 				INT,
    OUT o_return_value 			VARCHAR(100)
)

WE CAN USER SUBSCRIPED OR NOT HERE IT SELF
BEGIN
	IF EXISTS (SELECT user_id FROM bs_user_notification_subscription WHERE user_id = i_user_id) THEN
      SET o_return_value= 'USER IS SUBSCRIBED';
	ELSE
    SET o_return_value= 'USER IS NOT SUBSCRIBED';
	END IF;
end $$

DELIMITER ;


PRASAD
*/


BEGIN
	IF EXISTS (SELECT user_id FROM bs_user_notification_subscription WHERE user_id = i_user_id) THEN
         SELECT 
	       uns.endpoint
          ,	uns.p256dh
          ,uns.auth

     FROM bs_user_notification_subscription as uns WHERE uns.user_id = i_user_id;     
      SET o_return_value= 'USER IS SUBSCRIBED';
	ELSE
    SET o_return_value= 'USER IS NOT SUBSCRIBED';
  END IF;
end $$

DELIMITER ;