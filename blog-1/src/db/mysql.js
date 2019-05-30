const mysql = require('mysql')
const {
    MYSQL_CONF
} = require('../conf/db')

//创建链接对象
const con = mysql.createConnection(MYSQL_CONF)

//开始链接
con.connect()
console.log('已链接')
//执行sql的函数
function exec(sql) {
    console.log(sql)
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    exec,
    escape: mysql.escape
}