const getList = (author, keyword) => {
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

const getDetail = (id) => {
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

const newBlog = (blogData = {}) => {
    //blogdata 是一个博客对象，包含title content 属性
    console.log('newblog blogData ...', blogData)
    return {
        id: 3 //表示新建博客，插入到数据表里面的id
    }
}

const updateBlog = (id, blogData = {}) => {
    //blogdata 是一个博客对象，包含title content 属性
    console.log('updateBlog ...', id, blogData)
    return true
}

const delBlog = (id) => {
    //id 为删除博客的id
    console.log('delBlog ...', id)
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}