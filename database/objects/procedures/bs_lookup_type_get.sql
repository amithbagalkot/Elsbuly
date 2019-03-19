DROP PROCEDURE IF EXISTS  bs_lookup_type_get;

-- --------------------------------------------------------------------------------
-- Created Date : 6th March 2018
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `bs_lookup_type_get`
			(
				IN      i_lookup_type      VARCHAR(50)
			)

  begin
	select		lt.lookup_type_id
    ,			lt.lookup_type
    ,			lt.description
    ,			lt.record_status_id
    ,			lt.date_created 
    ,			lt.user_created
    ,			lt.date_updated
    ,			lt.user_updated
    from		bs_lookup_type lt
    where		lt.lookup_type  = IFNULL(i_lookup_type,lt.lookup_type) 
    order by 	lt.lookup_type asc
    ;

  end$$

DELIMITER ;