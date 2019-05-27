const {
    login,
    registerCheck
} = require('../controller/user')

const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')

const {
    set
} = require('../db/redis')


const handleBlogRouter = (req, res) => {
    const method = req.method //get post

    //登录
    if (method == 'POST' && req.path === '/api/user/login') {
        const {
            username,
            password
        } = req.body
        // const {
        //     username,
        //     password
        // } = req.query
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {

                //设置session
                req.session.username = data.username
                req.session.realname = data.realname;

                //同步redis
                set(req.sessionId,req.session)
                console.log("req.session is", req.session)
                return new SuccessModel()
            } else {
                return new ErrorModel('登录失败')
            }
        })
    }

    //登录验证测试
    // if (method === 'GET' && req.path === '/api/user/login-test') {
    //     if (req.session.username) {
    //         return Promise.resolve(
    //             new SuccessModel({
    //                 session: req.session
    //             })
    //         )
    //     }
    //     return Promise.resolve(new ErrorModel('尚未登录'))
    // }

    //注册
    if (method == 'POST' && req.path === '/api/user/register') {
        const {
            username,
            password,
            realname
        } = req.body
        const result = registerCheck(username, password, realname)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

}

module.exports = handleBlogRouter