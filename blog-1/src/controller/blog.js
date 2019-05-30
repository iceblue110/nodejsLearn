const xss =require('xss')
const {
    exec,
    escape
} = require('../db/mysql')

//xxx.html?k1=v1&k2=v2&k3=v3
const countTotal=(author, keyword,next)=>{
    
    

    if (author) {
        author = escape(author)
        sql += `and author=${author}`
    }
    if (keyword) {
        keyword = escape(keyword)
        sql += `and title like %${keyword}%`
    }
    let term='*'
    let sql = `select count(*) from blogs where 1=1 `

    return exec(sql)
    
}
const getList = (author, keyword,next) => {
    
   
   
    let sql = `select * from blogs where 1=1 `
    if (author) {
        author = escape(author)
        sql += `and author=${author}`
    }
    if (keyword) {
        keyword = escape(keyword)
        sql += `and title like '%${keyword}%'`
    }
    // if (next) {
    //     let a=next*10
    //     let b=a-9
    //     sql += `limit '${b}','${a}'`
    // }
    sql += ` order by createtime desc`
    
    //返回promise
    return exec(sql)
    //先返回假数据（格式是正确的）
    // return [{
    //         id: 1,
    //         title: '标题a',
    //         content: '内容a',
    //         createTime: 12314234,
    //         author: 'la'
    //     },
    //     {
    //         id: 2,
    //         title: '标题b',
    //         content: '内容b',
    //         createTime: 12314234,
    //         author: 'lb'
    //     },
    //     {
    //         id: 3,
    //         title: '标题c',
    //         content: '内容c',
    //         createTime: 12314234,
    //         author: 'lc'
    //     },
    // ]
}
//获取博客详情
const getDetail = (id) => {
    id = escape(id)
    const sql = `select * from blogs where id=${id}`
    return exec(sql).then(rows => {
        return rows[0]
    })
    //先返回假数据（格式是正确的）
    return [{
            id: 1,
            title: '标题a',
            content: '内容a',
            createTime: 12314234,
            author: 'la'
        },
        {
            id: 2,
            title: '标题b',
            content: '内容b',
            createTime: 12314234,
            author: 'lb'
        },
        {
            id: 3,
            title: '标题c',
            content: '内容c',
            createTime: 12314234,
            author: 'lc'
        },
    ]
}

//新建博客
const newBlog = (blogData = {}) => {
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

    return exec(sql).then(insertData => {
        console.log('insertData is', insertData)
        return {
            id: insertData.insertId
        }
    })
    // return {
    //     id: 3 //表示新建博客，插入到数据表里面的id
    // }
}

//更新博客
const updateBlog = (id, blogData = {}) => {

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
    console.log('updateBlog ...', id, blogData)
    return exec(sql).then(updateData => {
        console.log('updateData is', updateData)
        if (updateData.affectedRows > 0) {
            return true
        }
        return false

    })
    // return true
}

const delBlog = (id, author) => {
    //id 为删除博客的id
    id = escape(id)
    author = escape(author)

    const sql = `
     delete from blogs where id=${id} and author=${author};
    `
    console.log('delBlog ...', id)
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
    // return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}