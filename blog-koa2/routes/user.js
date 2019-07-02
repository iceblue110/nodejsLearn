const router = require('koa-router')()
const {
    login,
    registerCheck
} = require('../controller/user')
const {
    SuccessModel,
    ErrorModel,
    SpecialModel
} = require('../model/resModel');


//在下面的路由 增加前缀
router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
    //res.json()可直接返回数据 并且 直接setHeader为'Content-type', 'application/json'
    const {
        username,
        password
    } = ctx.request.body

    const data = await login(username, password)
    if (data.username) {
        //设置session
        ctx.session.username = data.username
        ctx.session.realname = data.realname;
        ctx.body = new SuccessModel()

        return
    }
    ctx.body = new ErrorModel('登录失败')
})

router.get('/loginCheck', async function (ctx, next) {
    //res.json()可直接返回数据 并且 直接setHeader为'Content-type', 'application/json'
    if (ctx.session.username) {
        //设置session
        ctx.body = new SuccessModel({
            username:ctx.session.username
        })
        return
    }
    ctx.body = new SpecialModel('未登录')
})


module.exports = router