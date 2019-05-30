const {
    login,
    registerCheck
} = require('../controller/user')

const {
    SuccessModel,
    ErrorModel,
    SpecialModel
} = require('../model/resModel')

const {
    set
} = require('../db/redis')

const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(
            new SpecialModel('尚未登录')
        )
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method //get post
    console.log(req.body, req.query)
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
        console.log(username, password)
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {

                //设置session
                req.session.username = data.username
                req.session.realname = data.realname;

                //同步redis
                set(req.sessionId, req.session)
                console.log("req.session is", req.session)
                return new SuccessModel()
            } else {
                return new ErrorModel('登录失败')
            }
        })
    }

    //登录验证测试
    if (method === 'GET' && req.path === '/api/user/loginCheck') {

        //管理员界面
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            //未登录
            return loginCheckResult
        }

        return Promise.resolve(
            new SuccessModel({
                session: req.session
            })
        )
    }

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