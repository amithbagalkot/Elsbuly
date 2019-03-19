DROP FUNCTION IF EXISTS  bs_user_type;
-- CONVERT THIS AS A FUNCTION instead of earlier procedure
-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE FUNCTION `bs_user_type` 
			(
				IN      i_email_id        VARCHAR(50)
			)
            
  begin
    select		u.user_name 
    ,			u.user_id
    ,			u.display_name
    ,			u.user_type_id
	,   		u.employee_role_id				
    ,       	lv.lookup_value user_type
    ,           case when u.employee_role_id = 0 THEN lv.lookup_value
                     else (select lv1.lookup_value from bs_lookup_value lv1
                           where  lv1.lookup_value_id = u.employee_role_id) end user_role
	,           case when u.employee_role_id = 0 THEN u.user_type_id
                     else u.employee_rold_id end user_role_id
	from    	bs_user u
    ,			bs_lookup_value lv
    ,			bs_lookup_type lt
    where		u.email_id  = i_email_id
    and			u.user_type_id = lv.lookup_value_id
    and			lv.lookup_type_id = lt.lookup_type_id
    ;
  end