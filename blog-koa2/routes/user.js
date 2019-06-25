const router = require('koa-router')()

//在下面的路由 增加前缀
router.prefix('/api/user')

router.post('/list', async function (ctx, next) {
    const {
        username,
        password
    } = ctx.request.body
    const query = ctx.query
    ctx.body = {
        errno: 0,
        username,
        password
    }
})

module.exports = router