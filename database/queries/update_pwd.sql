
update bs_user set password = md5(password)
where password = 'elsbuly';

commit;