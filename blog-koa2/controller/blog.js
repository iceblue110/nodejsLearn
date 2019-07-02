const xss = require('xss')
const {
    exec,
    escape
} = require('../db/mysql')

//xxx.html?k1=v1&k2=v2&k3=v3
const countTotal = (author, keyword) => {
    if (author) {
        author = escape(author)
        sql += `and author=${author}`
    }
    if (keyword) {
        keyword = escape(keyword)
        sql += `and title like %${keyword}%`
    }
    let term = '*'
    let sql = `select count(*) from blogs where 1=1 `

    return exec(sql)

}
const getList = async (author, keyword) => {
    console.log(author, keyword)
    let sql = `select * from blogs where 1=1 `
    if (author) {
        author = escape(author)
        sql += `and author=${author}`
    }
    if (keyword) {
        keyword = escape(keyword)
        sql += `and title like '%${keyword}%'`
    }
    sql += ` order by createtime desc`

    //返回promise
    return await exec(sql)

}
//获取博客详情
const getDetail = async (id) => {
    id = escape(id)
    const sql = `select * from blogs where id=${id}`
    const rows = await exec(sql)
    return rows[0]
    // return await exec(sql).then(rows => {
    //     return rows[0]
    // })
}

//新建博客
const newBlog = async (blogData = {}) => {
    //blogdata 是一个博客对象，包含title content 属性
    console.log('newblog blogData ...', blogData)
    let {
        title,
        content,
        author
    } = blogData
    title = xss(title)
    content = xss(content)

    const createTime = Date.now()
    const sql = `
     insert into blogs (title,content,author,createTime) 
     values ('${title}','${content}','${author}','${createTime}');
    `

    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    }
    // return exec(sql).then(insertData => {
    //     console.log('insertData is', insertData)
    //     return {
    //         id: insertData.insertId
    //     }
    // })
    // return {
    //     id: 3 //表示新建博客，插入到数据表里面的id
    // }
}

//更新博客
const updateBlog = async (id, blogData = {}) => {

    //blogdata 是一个博客对象，包含title content 属性
    let {
        title,
        content
    } = blogData
    // title = escape(title)
    // content = escape(content)
    title = xss(title)
    content = xss(content)

    const sql = `
    update blogs set title='${title}',content='${content}'
    where id='${id}'
    `
    const updateData = await exec(sql)
    if (updateData.affectedRows > 0) {
        return true
    }
    return false

    // return exec(sql).then(updateData => {
    //     console.log('updateData is', updateData)
    //     if (updateData.affectedRows > 0) {
    //         return true
    //     }
    //     return false

    // })
    // return true
}

const delBlog = async (id, author) => {
    //id 为删除博客的id
    id = escape(id)
    author = escape(author)

    const sql = `
     delete from blogs where id=${id} and author=${author};
    `
    console.log('delBlog ...', id)
    const delData = await exec(sql)
    if (delData.affectedRows > 0) {
        return true
    }
    return false
    // return exec(sql).then(delData => {
    //     if (delData.affectedRows > 0) {
    //         return true
    //     }
    //     return false
    // })
    // return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}