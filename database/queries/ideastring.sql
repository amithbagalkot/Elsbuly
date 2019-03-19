-- changes
select *
from bs_idea bi;

select 	concat('"',bi.idea_type,' ',bi.script_name,' ',bi.instrument,' ',bi.exchange_code,' '
			  ,bi.base_symbol,' '
			  ,idea_type,' '
			  ,idea_strength,' '
   			  ,price_at_idea_open,' '
			  ,trader_note,' '
   			  ,'at ',bi.idea_time,' '
              ,'by ',ba.display_name
              ,'"') idea
from	bs_idea bi
,		bs_advisor ba
-- ,	bs_country bc
-- ,    bs_region br
where  	bi.advisor_id = ba.advisor_id
;
