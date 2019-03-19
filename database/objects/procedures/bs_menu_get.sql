
DROP PROCEDURE IF EXISTS  bs_menu_get;

-- --------------------------------------------------------------------------------
-- Created Date : 10th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_menu_get`
				(
					IN      i_user_role_id		INT                    
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = activeStatus);
	 
	SELECT		m.menu_id
	,			m.role_id
    ,			m.menu_name
    ,			m.menu_code
	,			m.parent_menu_id
    ,			m.url
    ,			m.description
    ,			m.menu_icon_file
    ,			m.date_created 
    ,			m.user_created
    ,			m.date_updated
    ,			m.user_updated
    ,			m.display_order
    FROM		bs_menu m
    WHERE		m.role_id = i_user_role_id
    AND			m.record_status_id=statusId
    ORDER BY 	m.display_order ASC;
end $$

DELIMITER ;