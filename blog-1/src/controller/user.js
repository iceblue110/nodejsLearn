const {
    exec,
    escape
} = require('../db/mysql')

const login = (username, password) => {
    username = escape(username)
    password = escape(password)

    const sql = `
        select username, realname from users 
        where username=${username} and password=${password}
    `
    // console.log('sql is',sql)
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}


const registerCheck = (username, password, realname) => {
    username = escape(username)
    password = escape(password)
    realname = escape(realname)
    const createTime = Date.now()
    const sql = `
     insert into users (username,password,realname,createTime) values (${username},${password},${realname},${createTime});
    `

    return exec(sql).then(insertUserData => {
        console.log('insertUserData is', insertUserData)
        return {
            id: insertUserData.insertId
        }
    })
    // //先使用假数据
    // if (username == 'zhangsan' && password === '123') {
    //     return true
    // }
    // return false
}

module.exports = {
    login,
    registerCheck
}