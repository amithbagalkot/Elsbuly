DROP FUNCTION IF EXISTS  bs_user_validate;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE FUNCTION `bs_user_validate` 
			(
				      i_user_name      	VARCHAR(50),
                      i_password		VARCHAR(50)
			)
			RETURNS INT(11)
            
BEGIN  
 
DECLARE o_user_id INT;

    select		u.user_id
	into		o_user_id
	from    	bs_user u
    where	   (u.user_name  = i_user_name or u.email_id = i_user_name) 
	and			u.password = i_password
    limit 		1
    ;
    
RETURN o_user_id;
END $$

DELIMITER ;
