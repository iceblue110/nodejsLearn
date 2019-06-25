const router = require('koa-router')()

//在下面的路由 增加前缀
router.prefix('/api/blog')

router.get('/list', function (ctx, next) {
    const query = ctx.query
    ctx.body = {
        errno: 0,
        query,
        data: ['获取博客列表']
    }
})

module.exports = router