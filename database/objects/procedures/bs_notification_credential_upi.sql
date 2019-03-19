DROP PROCEDURE IF EXISTS bs_user_notification_subscription_upi;
-- CREATE ON 16--11-2018--
    
DELIMITER $$
    
    CREATE PROCEDURE bs_user_notification_subscription_upi (
		IN 	i_user_id							INT
,		IN 	i_user_type_id						INT
,		IN 	i_user_subscription_id 				INT
,		IN 	i_endpoint							VARCHAR(255)
,		IN 	i_p256dh							VARCHAR(255)
,		IN 	i_auth								VARCHAR(255)
,		OUT o_return_value						VARCHAR(100)
    )
    
begin

DECLARE activeStatus 		VARCHAR(50);
-- DECLARE user_id 			INT;
-- DECLARE user_type_id 		INT;
DECLARE ii_user_id 		INT;

	SET activeStatus 		= 'ACTIVE';
    -- SET user_id = (SELECT user_id FROM bs_user WHERE user_id = i_user_id);
    -- SET user_type_id = (SELECT user_type_id FROM bs_user WHERE user_type_id = i_user_type_id);
    SELECT user_id INTO ii_user_id FROM bs_user_notification_subscription WHERE user_id = i_user_id;
    
    -- IF ii_user_id IS NULL THEN

INSERT INTO bs_user_notification_subscription(
	user_id
,	user_type_id
,	user_subscription_id
,	endpoint
,	p256dh
,	auth
)
value(
	i_user_id
,	i_user_type_id
,	i_user_subscription_id
,   i_endpoint
,  	i_p256dh
,   i_auth
);

SET o_return_value = 'USER SUBSCRIBED ';
-- SET o_return_value = 'USER IS ALREADY SUBSCRIBED';
-- END IF;
end $$

DELIMITER ;