DROP PROCEDURE IF EXISTS  bs_idea_board_get;

-- --------------------------------------------------------------------------------
-- Created Date : 12 March 2019
-- --------------------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE `bs_idea_board_get`
				(
                    IN		i_idea_id					 INT
				)
begin
	
	DECLARE activeStatus		VARCHAR(50);
	DECLARE statusId			INT;

	SET activeStatus = 'ACTIVE';
	SET statusId = (SELECT lookup_value_id FROM bs_lookup_value WHERE lookup_code = 'ACTIVE');
    
	SELECT * FROM bs_idea_board WHERE idea_id = i_idea_id ;
    
end $$

DELIMITER ;