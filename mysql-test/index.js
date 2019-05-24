const mysql = require('mysql')

//创建链接对象
const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '12345678',
    port: '3306',
    database: 'myblog'

})

//开始链接
con.connect()

//执行sql语句
const sql = "insert into blogs (title,content,createtime,author) values ('标题d','内容d','1558697029099','zhangsan');"
con.query(sql, (err, result) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(result)
})

con.end()