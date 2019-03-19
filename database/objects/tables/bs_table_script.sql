
DROP TABLE IF EXISTS bs_lookup_type;
CREATE TABLE bs_lookup_type (
    lookup_type_id                  INT             NOT NULL 
,   lookup_type                     VARCHAR(50)     NOT NULL    
,   description                     VARCHAR(50)     NOT NULL
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,   UNIQUE KEY bs_lookup_type_u1 (lookup_type_id)
,   UNIQUE KEY bs_lookup_type_u2 (lookup_type)
)   ENGINE=InnoDB DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS bs_lookup_value;
CREATE TABLE bs_lookup_value (
    lookup_value_id                 INT             NOT NULL    
,   lookup_type_id                  INT             NOT NULL
,   lookup_code                     VARCHAR(100)    NOT NULL
,   lookup_value                    VARCHAR(100)    NOT NULL
,   description                     VARCHAR(100)    NOT NULL
,   display_order		    		INT	
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,   UNIQUE KEY bs_lookup_value_u1 (lookup_value_id)
,   UNIQUE KEY bs_lookup_value_u2 (lookup_type_id,lookup_code)
)   ENGINE=InnoDB DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS bs_region;
CREATE TABLE bs_region (
    region_id                       INT             NOT NULL    
,   region_code                     VARCHAR(10)     NOT NULL    
,   region_name                     VARCHAR(30)     NOT NULL
,   description              	    VARCHAR(100)    NOT NULL
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,   UNIQUE KEY bs_region_u1 (region_id)
,   UNIQUE KEY bs_region_u2 (region_code)
,   UNIQUE KEY bs_region_u3 (region_name)
)   ENGINE=InnoDB DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS bs_country;
CREATE TABLE bs_country (
    country_id                      INT             NOT NULL     
,   region_id                       INT             NOT NULL
,   country_code                    VARCHAR(10)     NOT NULL
,   country_name                    VARCHAR(80)     NOT NULL    
,   description                     VARCHAR(240)    
,   telephone_code		    		INT		    	NOT NULL
,   currency_code                   VARCHAR(10)     
,   currency_name                   VARCHAR(40)
,   idea_price		    			DECIMAL(10,2)	NULL
,   idea_cost		    	    	DECIMAL(10,2)  	NULL
,   idea_board_limit          		INT  			NULL
,   idea_board_trader_limit   		INT  			NULL  
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS	
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,   UNIQUE KEY bs_country_u1 (country_id)
,   UNIQUE KEY bs_country_u2 (country_code)
,   UNIQUE KEY bs_country_u3 (country_name)
,   UNIQUE KEY bs_country_u4 (region_id,country_code)
)   ENGINE=InnoDB DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS bs_menu;
CREATE TABLE bs_menu (
	menu_id							INT				NOT NULL		
,	role_id							INT				NOT NULL
,	menu_name						VARCHAR(100)	NOT NULL
,	menu_code						VARCHAR(100)	NOT NULL
,	parent_menu_id					INT
,	url								VARCHAR(255)
,   description						VARCHAR(255)	
,   menu_icon_file                  VARCHAR(255)
,	display_order					INT	
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,   UNIQUE KEY bs_menu_u1 (menu_id)
,   UNIQUE KEY bs_menu_u2 (role_id,menu_code)
)   ENGINE=InnoDB DEFAULT CHARSET=UTF8;
-- index should be menu code and role type or name

DROP TABLE IF EXISTS bs_user;
CREATE TABLE bs_user (
    user_id                     	INT  			NOT NULL		AUTO_INCREMENT 	
,   country_id						INT  			NOT NULL
,   location						VARCHAR(50)		NULL 
,   telephone						VARCHAR(20)		NOT NULL  
,   user_name                   	VARCHAR(250)		NULL 	
,   password                    	VARCHAR(1000)   NOT NULL    -- BLOB
,	salt						 	VARCHAR(20)		NULL        
,   password_reset_token			VARCHAR(40)		NULL
,	password_reset_time				DATETIME		NULL
,	email_verification_token		VARCHAR(250)	NULL
,   otp_code						VARCHAR(11)		NULL
,	otp_counter						INT				DEFAULT NULL 			
,	otp_sent_date					DATETIME		DEFAULT NULL     --	otp_time (old column)
, 	otp_resent_date					DATETIME		DEFAULT NULL
,   email_id 	                   	VARCHAR(40) 	NOT NULL
,	first_name				 		VARCHAR(50)		NULL
,	last_name				 		VARCHAR(50)		NULL
,	middle_name				 		VARCHAR(50)		NULL
,	picture_file_name       		VARCHAR(50)    	DEFAULT NULL -- Actual Picture
,   secret_code						VARCHAR(1000)	NULL  
, 	company_name 					VARCHAR(120)	NULL
,   display_name					VARCHAR(15) 	NULL 		-- Display Name at idea boards for Privacy
,	display_picture_file_name       VARCHAR(50)    	DEFAULT NULL -- Display Picture
,	gender_id						INT      		NOT NULL 	-- CODE GENDER
,   date_of_birth					DATETIME		NULL
,   user_type_id                	INT  			NOT NULL    -- CODE USER_TYPE
,   user_source_id                	INT  			NOT NULL    -- CODE USER_SOURCE
,	employee_number				 	VARCHAR(50)		NULL        -- For Employee Only
,   employee_type_id				INT   			NULL 		-- CODE EMPLOYEE_TYPE
,   user_role_id					INT   			NULL 		-- CODE EMPLOYEE_ROLE
,   idea_price		    			DECIMAL(10,2)	NULL        -- For Advisor Only
,   idea_cost		    	    	DECIMAL(10,2)  	NULL		-- For Advisor Only
,   idea_push_preference_id    		INT   			NOT NULL    -- CODE IDEA_PUSH_PREFERENCE
,   employee_status_id         		INT   			NULL 		-- CODE EMPLOYEE_STATUS
,   advisor_status_id          		INT  			NULL 		-- CODE ADVISOR_STATUS
,   trader_status_id            	INT  		  	NULL 		-- CODE TRADER_STATUS
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_user_u1 (user_id)
,	UNIQUE KEY bs_user_u2 (user_name,user_type_id)
,	UNIQUE KEY bs_user_u3 (email_id,user_type_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS bs_exchange;
CREATE TABLE bs_exchange (
    exchange_id			    		INT		    	NOT NULL		AUTO_INCREMENT 
,   country_id                      INT             NOT NULL     
,   exchange_code                   VARCHAR(20)     NOT NULL 	
,   exchange_name                   VARCHAR(80)     NOT NULL
,   display_name                    VARCHAR(20)     NOT NULL    
,   display_order		    		INT	
,   description                     VARCHAR(240)
,   idea_price		    			DECIMAL(10,2)	NULL
,   idea_cost		    	    	DECIMAL(10,2)  	NULL
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_exchange_u1 (exchange_id)
,	UNIQUE KEY bs_exchange_u2 (country_id,exchange_code)
,	KEY 	   bs_exchange_n1 (country_id,exchange_code,exchange_name)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;
-- Do we need timezone field in exchange table?
-- Do we need idea price and idea costs in exchange table? May be for Future 
-- We may also have to move the above columns to detail table with date ranges to maintain the hisotry 
-- which is imp for cost analysis also plan for price rise

DROP TABLE IF EXISTS bs_instrument;
CREATE TABLE bs_instrument (
    instrument_id		    		INT		    	NOT NULL		AUTO_INCREMENT 
,   country_id                      INT             NOT NULL     
,   instrument_code                 VARCHAR(20)     NOT NULL 	
,   instrument_name                 VARCHAR(80)     NOT NULL
,   display_name                    VARCHAR(20)     NOT NULL    
,   display_order		    		INT	
,   description                     VARCHAR(240)
,   idea_price		    			DECIMAL(10,2)	NULL
,   idea_cost		    	    	DECIMAL(10,2)  	NULL
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_instrument_u1 (instrument_id)
,	UNIQUE KEY bs_instrument_u2 (country_id,instrument_code)
,	KEY 	   bs_instrument_n1 (country_id,instrument_code,instrument_name)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;
-- Indexes
-- Do we need timezone field in exchange table?
-- Do we need idea price and idea costs in exchange table? May be for Future 
-- We may also have to move the above columns to detail table with date ranges to maintain the hisotry 
-- which is imp for cost analysis also plan for price rise

DROP TABLE IF EXISTS bs_segment;
CREATE TABLE bs_segment (
    segment_id		    			INT		    	NOT NULL 		AUTO_INCREMENT
,   country_id                      INT             NOT NULL     
,   segment_code                 	VARCHAR(20)     NOT NULL 	
,   segment_name                 	VARCHAR(80)     NOT NULL
,   display_name                    VARCHAR(20)     NOT NULL    
,   display_order		    		INT	
,   description                     VARCHAR(240)
,   idea_price		    			DECIMAL(10,2)	NULL
,   idea_cost		    	    	DECIMAL(10,2)  	NULL
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_segment_u1 (segment_id)
,	UNIQUE KEY bs_segment_u2 (country_id,segment_code,segment_name)
,	KEY 	   bs_segment_n1 (country_id,segment_code)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;
-- Do we need timezone field in exchange table?
-- Do we need idea price and idea costs in exchange table? May be for Future 
-- We may also have to move the above columns to detail table with date ranges to maintain the hisotry 
-- which is imp for cost analysis also plan for price rise

DROP TABLE IF EXISTS bs_script;
CREATE TABLE bs_script (
    script_id		    			INT		    	NOT NULL		AUTO_INCREMENT
,   exchange_id                     INT             NOT NULL     
,	country_id						int			    NOT NULL
,   script_code			    		VARCHAR(25)    	NOT NULL
,   script_name                    	VARCHAR(80)     NOT NULL
,	expiry							VARCHAR(80)		NULL
,	strike							INT		        NULL
,	tick_size						DECIMAL(10,2)	NULL
,	lot_size						DECIMAL(10,2)	NULL
,	instrument						VARCHAR(10)		NULL
,	segment							VARCHAR(10)		NULL
,	base_script_code				VARCHAR(40)    	NULL
,	base_symbol						VARCHAR(25)    	NULL
,   description                     VARCHAR(240)    NULL
,   display_name                    VARCHAR(80)     NULL    
,   display_order		    		INT				NULL 
,   idea_price		    			DECIMAL(10,2)	NULL
,   idea_cost		    	    	DECIMAL(10,2)  	NULL
,   record_status_id		    	INT				NULL		-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_script_u1 (script_id)
,	UNIQUE KEY bs_script_u2 (exchange_id,country_id,script_code)
,	KEY 	   bs_script_n1 (script_name)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;
-- Why do we need signal price and signal cost fields? - May be required for future script level price 

DROP TABLE IF EXISTS bs_advisor_country;
CREATE TABLE bs_advisor_country (
    advisor_country_id				INT  			NOT NULL		AUTO_INCREMENT
,   advisor_id                   	INT  			NOT NULL 
,	country_id						INT				NOT NULL 	
,   current_record_id				INT      		NOT NULL 	-- CODE YES_NO
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_advisor_country_u1 (advisor_country_id)
,	UNIQUE KEY bs_advisor_country_u2 (advisor_id,country_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS bs_advisor_exchange;
CREATE TABLE bs_advisor_exchange (   
    advisor_exchange_id				INT  			NOT NULL		AUTO_INCREMENT
-- ,	country_id						INT				NOT NULL 	
,   advisor_id                   	INT  			NOT NULL 
,	exchange_id						INT     		NOT NULL
,   current_record_id				INT      		NOT NULL 	-- CODE YES_NO
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_advisor_exchange_u1 (advisor_exchange_id)
,	UNIQUE KEY bs_advisor_exchange_u2 (advisor_id,exchange_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;


DROP TABLE IF EXISTS bs_advisor_instrument;
CREATE TABLE bs_advisor_instrument (   
    advisor_instrement_id				INT  			NOT NULL		AUTO_INCREMENT
-- ,	country_id						INT				NOT NULL 	
-- ,	exchange_id						INT     		NOT NULL
,   advisor_id                   	INT  			NOT NULL 
,	instrument_id					int				NOT NULL
,   current_record_id				INT      		NOT NULL 	-- CODE YES_NO
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_advisor_instrument_u1 (advisor_instrement_id)
,	UNIQUE KEY bs_advisor_instrument_u2 (advisor_id,instrument_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS bs_advisor_segment;
CREATE TABLE bs_advisor_segment (   
    advisor_segment_id				INT  			NOT NULL			AUTO_INCREMENT
-- ,	country_id						INT				NOT NULL 	
-- ,	exchange_id						INT     		NOT NULL
-- ,	instrument_id					int				NOT NULL
,   advisor_id                   	INT  			NOT NULL 
,	segment_id							INT				NOT NULL
,   current_record_id				INT      		NOT NULL 	-- CODE YES_NO
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_advisor_segment_u1 (advisor_segment_id)
,	UNIQUE KEY bs_advisor_segment_u2 (advisor_id,segment_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS bs_advisor_script;
CREATE TABLE bs_advisor_script ( 
    advisor_script_id				INT  			NOT NULL			AUTO_INCREMENT
,   advisor_id                   	INT  			NOT NULL 
,   script_id						INT  			NOT NULL -- Trader and Advisor Country be same
,   current_record_id				INT      		NOT NULL 	-- CODE YES_NO
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_advisor_script_u1 (advisor_script_id)
,	UNIQUE KEY bs_advisor_script_u2 (advisor_id,script_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS bs_advisor_trader;
CREATE TABLE bs_advisor_trader ( -- One Advisor can allow only some Traders to receive the ideas (Premium) from his/her country    
    advisor_trader_id				INT  			NOT NULL			AUTO_INCREMENT
,   advisor_id                   	INT  			NOT NULL 
,   trader_id						INT  			NOT NULL -- Trader and Advisor Country be same
,   current_record_id				INT      		NOT NULL 	-- CODE YES_NO
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_advisor_trader_u1 (advisor_trader_id)
,	UNIQUE KEY bs_advisor_trader_u2 (advisor_id,trader_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS bs_advisor_preference;
CREATE TABLE  bs_advisor_preference (
	advisor_preference_id  			INT 			NOT NULL			AUTO_INCREMENT
,   advisor_id                   	INT  			NOT NULL
,	profile_display_id				INT				NOT NULL
,	trader_display_id				INT				NOT NULL
,	idea_display_id 				INT				NOT NULL
,	push_notification_id			INT				NOT NULL
,	email_notification_id			INT				NOT NULL
,	text_notification_id			INT				NOT NULL
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_advisor_preference_u1 (advisor_preference_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

 
DROP TABLE IF EXISTS bs_trader_country;
CREATE TABLE bs_trader_country (
    trader_country_id				INT  			NOT NULL		AUTO_INCREMENT
,   trader_id                   	INT  			NOT NULL 
,	country_id						INT				NOT NULL 	
,   current_record_id				INT      		NOT NULL 	-- CODE YES_NO
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_trader_country_u1 (trader_country_id)
,	UNIQUE KEY bs_trader_country_u2 (trader_id,country_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS bs_trader_exchange;
CREATE TABLE bs_trader_exchange (   
    trader_exchange_id				INT  			NOT NULL		AUTO_INCREMENT
-- ,	country_id						INT				NOT NULL 	
,   trader_id                   	INT  			NOT NULL 
,	exchange_id						INT     		NOT NULL
,   current_record_id				INT      		NOT NULL 	-- CODE YES_NO
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_trader_exchange_u1 (trader_exchange_id)
,	UNIQUE KEY bs_trader_exchange_u2 (trader_id,exchange_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS bs_trader_instrument;
CREATE TABLE bs_trader_instrument (   
    trader_instrument_id			INT  			NOT NULL			AUTO_INCREMENT
-- ,	country_id						INT				NOT NULL 	
-- ,	exchange_id						INT     		NOT NULL
,   trader_id                   	INT  			NOT NULL 
,	instrument_id					INT     		NOT NULL
,   current_record_id				INT      		NOT NULL 	-- CODE YES_NO
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_trader_instrument_u1 (trader_instrument_id)
,	UNIQUE KEY bs_trader_instrument_u2 (trader_id,instrument_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS bs_trader_segment;
CREATE TABLE bs_trader_segment (   
    trader_segment_id				INT  			NOT NULL			AUTO_INCREMENT
-- ,	country_id						INT				NOT NULL 	
-- ,	exchange_id						INT     		NOT NULL
-- ,	instrument_id					int				NOT NULL
,   trader_id                   	INT  			NOT NULL 
,	segment_id						INT     		NOT NULL
,   current_record_id				INT      		NOT NULL 	-- CODE YES_NO
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_trader_segment_u1 (trader_segment_id)
,	UNIQUE KEY bs_trader_segment_u2 (trader_id,segment_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS bs_trader_script;
CREATE TABLE bs_trader_script (   
    trader_script_id				INT  			NOT NULL			AUTO_INCREMENT
,   trader_id                   	INT  			NOT NULL 
,   script_id						INT  			NOT NULL -- Trader and Advisor Country be same
,   current_record_id				INT      		NOT NULL 	-- CODE YES_NO
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_trader_script_u1 (trader_script_id)
,	UNIQUE KEY bs_trader_script_u2 (trader_id,script_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS bs_trader_advisor;
CREATE TABLE bs_trader_advisor ( -- One Trader can opt for several Advisors from their country)    
    trader_advisor_id				INT  			NOT NULL			AUTO_INCREMENT
,   trader_id                   	INT  			NOT NULL 
,   advisor_id						INT  			NOT NULL -- Trader and Advisor Country be same
,   current_record_id				INT      		NOT NULL 	-- CODE YES_NO
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_trader_advisor_u1 (trader_advisor_id)
,	UNIQUE KEY bs_trader_advisor_u2 (trader_id,advisor_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;


DROP TABLE IF EXISTS bs_trader_preference;
CREATE TABLE  bs_trader_preference (
	trader_preference_id  			INT 			NOT NULL			AUTO_INCREMENT
,   trader_id                   	INT  			NOT NULL
,	profile_display_id				INT				NOT NULL
,	advisor_display_id				INT				NOT NULL
,	idea_display_id 				INT				NOT NULL
,	push_notification_id			INT				NOT NULL
,	email_notification_id			INT				NOT NULL
,	text_notification_id			INT				NOT NULL
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_trader_preference_u1 (trader_preference_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS bs_idea; 
CREATE TABLE bs_idea (
    idea_id                  		INT  			NOT NULL 			AUTO_INCREMENT
,   advisor_id           			INT  			NOT NULL
,   idea_time						DATETIME		NOT NULL
,   idea_string						VARCHAR(2000) 	NOT NULL
,	script_id						INT				NOT NULL
,   script_code						VARCHAR(80)		NOT NULL
,	exchange_id						INT				NOT NULL
,   exchange_code              		VARCHAR(20) 	NOT NULL
,	instrument_id					INT				NULL
,	instrument_code					VARCHAR(10)		NULL
,	base_script_id					INT				NULL
,	base_script_code				VARCHAR(40)    	NULL
,   country                    		VARCHAR(10)     NOT NULL   -- WHY ARe we storing country instead of country id
,   idea_type       	            VARCHAR(40)     NOT NULL -- CODE IDEA_TYPE
,   idea_status                   	VARCHAR(40)     NOT NULL -- CODE IDEA_STATUS WHY NOT IDS
,   idea_status_note				VARCHAR(80)
,   idea_strength       	        VARCHAR(40)     NOT NULL -- CODE IDEA_STRENGTH
,   price_at_idea_open				INT 			NOT NULL 
,   start_range_price				INT		
,   end_range_price					INT		
,   price_target1					INT
,   price_target2					INT
,   price_target3					INT
,   price_stoploss					INT
,   trader_note						VARCHAR(500)
,   advisor_note					VARCHAR(500)
,   price_at_idea_close				INT
,   advisor_rating					VARCHAR(40)     NOT NULL -- CODE IDEA_RATING
,   advisor_rating_note				VARCHAR(180)
,   price_target1_hit				VARCHAR(20)     NULL -- CODE YES_NO
,   price_target1_hit_time			DATETIME     	NULL 
,   price_target2_hit				VARCHAR(20)     NULL -- CODE YES_NO
,   price_target2_hit_time			DATETIME     	NULL 
,   price_target3_hit				VARCHAR(20)     NULL -- CODE YES_NO
,   price_target3_hit_time			DATETIME     	NULL 
,   price_stoploss_hit				VARCHAR(20)     NULL -- CODE YES_NO
,   price_stoploss_hit_time			DATETIME     	NULL
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_idea_u1 (idea_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS bs_idea_push;
CREATE TABLE bs_idea_push (
    idea_push_id              		INT  			NOT NULL 			AUTO_INCREMENT
,   idea_id                  		INT  			NOT NULL
,   trader_id						INT  			NOT NULL
,   idea_string						VARCHAR(2000) 	NOT NULL
,	idea_push_phone					VARCHAR(20)     NOT NULL
,   idea_push_status       			VARCHAR(40)     NOT NULL -- CODE IDEA_PUSH_STATUS
,   idea_push_date					DATETIME 		NOT NULL
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_idea_push_u1 (idea_push_id)
,	UNIQUE KEY bs_idea_push_u2 (idea_id,trader_id)
,	KEY 	   bs_idea_push_n1 (idea_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;
-- ,	push_idea_note					VARCHAR(80) FUTURE New/Close on first target/Exit on fail

DROP TABLE IF EXISTS bs_idea_rating; 
CREATE TABLE bs_idea_rating (  
    idea_rating_id            		INT  			NOT NULL 			AUTO_INCREMENT
,   idea_id                  		INT  			NOT NULL
,   trader_id						INT  			NOT NULL
,   idea_rating						VARCHAR(40)     NOT NULL -- CODE IDEA_RATING
,   idea_rating_note				VARCHAR(180)
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_idea_rating_u1 (idea_rating_id)
,	UNIQUE KEY bs_idea_rating_u2 (idea_id,trader_id)
,	KEY 	   bs_idea_rating_n1 (idea_rating)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS bs_idea_board; 
CREATE TABLE bs_idea_board (
    idea_board_id            		INT  			NOT NULL 			AUTO_INCREMENT
,   idea_id           				INT  			NOT NULL
,   idea_board_number            	INT  			NOT NULL
, 	idea_board_limit				INT				NOT NULL
,   idea_board_name					VARCHAR(80) 
-- advisor display name + idea String or Code + Seq 01 or 02....max
,   idea_board_status      			VARCHAR(40)     NOT NULL -- CODE IDEA_BOARD_STATUS
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_idea_board_u1 (idea_board_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS bs_idea_board_trader;
CREATE TABLE bs_idea_board_trader (
    idea_board_trader_id     		INT  			NOT NULL 			AUTO_INCREMENT
,   idea_id           				INT  			NOT NULL
,   idea_board_id           		INT  			NOT NULL
,   trader_id           			INT  			NOT NULL
,   display_name					VARCHAR(80)     NOT NULL
--  ask trader to provide a display name while joining or assign some random 5 char alphanumeric (PNR) 
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_idea_board_trader_u1 (idea_board_trader_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;
-- Traders who receives the idea only can join in any one of the idea boards
-- idea_id + trader_id is unique

DROP TABLE IF EXISTS bs_idea_board_trader_chat;
CREATE TABLE bs_idea_board_trader_chat (
    idea_board_trader_chat_id		INT  			NOT NULL 			AUTO_INCREMENT
,   idea_board_id           		INT  			NOT NULL
,   idea_board_chat_content	    	VARCHAR(10000)  NULL
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_idea_board_trader_chat_u1 (idea_board_trader_chat_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;
-- should we store the chat content in database or store in file and store the file location

DROP TABLE IF EXISTS bs_payment;
CREATE TABLE bs_payment (
     payment_id                  	INT    			NOT NULL 			AUTO_INCREMENT
,    user_id         				INT			    NULL
,    country						VARCHAR(20)		NULL
,    telephone						VARCHAR(20) 	NULL
,	 user_type_id					int				NOT NULL -- Trader, Advisor, Employee etc
,	 payment_currency				VARCHAR(3)		NOT NULL
,	 payment_amount					INT				NOT NULL
,    payment_date            		DATE					    
,    payment_reference           	VARCHAR(25)     NOT NULL
,    payment_source              	VARCHAR(45)     NULL
,    payment_status              	INT				NULL -- DO WE NEED LOOKUP?
,    record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_payment_u1 (payment_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS bs_advisor_ledger;
CREATE TABLE bs_advisor_ledger (
    advisor_ledger_id				INT  			NOT NULL			AUTO_INCREMENT
,   advisor_id						INT
,	payment_id						INT				NOT NULL
,   trx_type_id						INT      		NOT NULL 	-- CODE TRX_TYPE
,   trx_reference					VARCHAR(40) 	NOT NULL 	-- Payment Ref/idea/Board
,   trx_date						DATE 			NOT NULL
,   start_balance					INT
,   trx_amount						INT
,   end_balance						INT
,   current_record_id				INT      		NOT NULL 	-- CODE YES_NO
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_advisor_ledger_u1 (advisor_ledger_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;
-- advisor_ledger_id is UNIQUE and should start with 1001 with increment of 1

DROP TABLE IF EXISTS bs_trader_ledger; 
CREATE TABLE bs_trader_ledger (
    trader_ledger_id				INT  			NOT NULL			AUTO_INCREMENT
,   trader_id                   	INT  			NOT NULL
,	payment_id						INT				NOT NULL
,   trx_type_id						INT      		NOT NULL -- CODE TRX_TYPE
,   trx_reference					VARCHAR(40) 	NOT NULL -- Payment Ref/idea/Board
,   trx_date						DATE 			NOT NULL
,   start_balance					INT
,   trx_amount						INT
,   end_balance						INT
,   current_record_id				INT      		NOT NULL -- CODE YES_NO
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_trader_ledger_u1 (trader_ledger_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;
-- trader_register_id is UNIQUE and should start with 1001 with increment of 1

DROP TABLE IF EXISTS bs_mobile_verification;
CREATE TABLE bs_mobile_verification (   
    mobile_verification_id			INT  			NOT NULL 			AUTO_INCREMENT
,	mobile_number					VARCHAR(50)		NOT NULL
,	country_id						INT				NOT NULL 	
, 	otp_code						VARCHAR(20)		NOT NULL
,	otp_counter						INT				NOT NULL 			DEFAULT 1
,	otp_sent_date					DATETIME		NOT NULL
, 	otp_resent_date					DATETIME		NULL
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_mobile_verification_u1 (mobile_verification_id)
,	UNIQUE KEY bs_mobile_verification_u2 (mobile_number)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS bs_service_provider;
CREATE TABLE bs_service_Provider (
    service_provider_id             INT				NOT NULL    		AUTO_INCREMENT
,   service_provider_name           VARCHAR(50)    	NOT NULL   
,  	country_id                      INT      		NOT NULL
,	service_provider_type_id		INT 			NOT NULL 	-- NEED A LOOK UP TYOE
,   url                             VARCHAR(200)   	NOT NULL
,   username                        VARCHAR(50)
,   password                        VARCHAR(50)  
,  	record_status_id                INT             NOT NULL        	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_service_provider_u1 (service_provider_id)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS bs_notification_credential;
CREATE TABLE bs_notification_credential (
	notification_credential_id		INT 			NOT NULL			AUTO_INCREMENT
,	user_id							INT				NOT NULL
,	endpoint_url					VARCHAR(255) 	
,	key_value_1						VARCHAR(255)
,	key_value_2						VARCHAR(255)
,   record_status_id		    	INT				NOT NULL	-- LOOKUP TYPE - RECORD_STATUS
,	date_created					DATETIME		DEFAULT NULL
,	user_created					INT				DEFAULT -1
,	date_updated					DATETIME		DEFAULT NULL
,	user_updated					INT				DEFAULT -1
,	UNIQUE KEY bs_notification_credential_u1 (notification_credential_id)
,	UNIQUE KEY bs_notification_credential_u2 (user_id,endpoint_url)
)   ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

