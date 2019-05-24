use myblog;

-- 插入和查询
-- show tables;
-- insert into users (username,`password`,realname) values ('zhangsan','123','张三');
-- select * from users;
-- select id,username from users;
-- select * from users where username='zhangsan' or `password`='123';
-- select * from users where username like '%zhang%'
-- select * from users where `password` like '%1%' order by id desc; 
-- desc 倒序


-- 更新
-- SET SQL_SAFE_UPDATES=0;  //update会有权限报错，需要本行设置
-- update users set realname='李四2' where username='lisi';

-- 删除
-- delete from users where username='lisi';
-- 真正的删除不用delete 而是更新state状态，便于恢复  <>为不等于
-- select * from users where state<>'0';
-- update users set state='0' where username='lisi'; -- 软删除

-- insert into blogs (title,content,createtime,author) values ('标题c','内容c','1558696808129','zhangsan');
-- select * from blogs where title like '%标题%' order by createtime desc;
-- select * from users;
-- select * from blogs;

-- select version();