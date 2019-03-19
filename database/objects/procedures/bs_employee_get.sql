
DROP PROCEDURE IF EXISTS  bs_employee_get;

DELIMITER $$

CREATE PROCEDURE `bs_employee_get`(
			IN i_usertype_id INT
)
BEGIN

  SELECT  bu.user_id
         ,bu.location
         ,bu.telephone
         ,bu.user_name
         ,bu.email_id
         ,bu.first_name
         ,bu.last_name
         ,bu.middle_name
         ,bu.company_name
         ,bu.display_name
         ,bu.gender_id
         ,bu.user_type_id
         ,bu.employee_number
         ,bu.employee_number
         ,bu.employee_type_id
         ,bu.user_role_id
         ,bu.idea_price
         ,bu.employee_status_id
         ,bu.advisor_status_id
         ,bu.date_created
         ,bu.date_updated
         FROM bs_user bu
		 WHERE bu.user_type_id=IFNULL(i_usertype_id,bu.user_type_id)
         ;
end $$

DELIMITER ;