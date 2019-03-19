
set sql_safe_updates = 0;

select count(*) lookup_types from bs_lookup_type;
select count(*) lookup_values from bs_lookup_value;
select count(*) regions from bs_region;
select count(*) countries from bs_country;
select count(*) users from bs_user;
select count(*) exchanges from bs_exchange;

select * from bs_country
where country_code in ('US','IN','GB','ES');

select * from bs_idea