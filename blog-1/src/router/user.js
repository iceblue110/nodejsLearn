const {
    loginCheck,
    registerCheck
} = require('../controller/user')

const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method //get post

    //登录
    if (method == 'POST' && req.path === '/api/user/login') {
        const {
            username,
            password
        } = req.body
        const result = loginCheck(username, password)
        if(result){
            return new SuccessModel()
        }
        else{
            return new ErrorModel('登录失败')
        }
    }

    //注册
    if (method == 'POST' && req.path === '/api/user/register') {
        const {
            username,
            password
        } = req.body
        const result = registerCheck(username, password)
        if(result){
            return new SuccessModel()
        }
        else{
            return new ErrorModel('注册失败')
        }
    }

}

module.exports = handleBlogRouter