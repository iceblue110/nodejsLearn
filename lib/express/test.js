const express = require('./like-express')

//当前http请求的实例
const app = express()

app.use((req, res, next) => {
    console.log('请求开始。。。', req.method, req.url)
    next()
})

app.use((req, res, next) => {
    //假设在处理cookie
    req.cookie = {
        userId: 'adb123',
    }
    next()
})

app.use((req, res, next) => {
    //假设处理post data
    //异步处理
    console.log(123)
    setTimeout(() => {
        req.body = {
            a: 100,
            b: 200
        }
        next()
    })

})

app.use('/api', (req, res, next) => {
    console.log('处理 /api 路由')
    next()
})

app.get('/api', (req, res, next) => {
    console.log('get /api 路由')
    next()
})

app.post('/api', (req, res, next) => {
    console.log('post /api 路由')
    next()
})

//模拟登验证
function loginCheck(req, res, next) {
    console.log('模拟登录失败')
    setTimeout(() => {
        res.json({
            errno:-1,
            msg:'登录失败'
        })
        //console.log('模拟登录成功')
        //next()
    })
}

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
    console.log('get /api/get-cookie')
    res.json({
        errno: 0,
        data: req.cookie
    })
})

app.post('/api/get-post-data', (req, res, next) => {
    console.log('post /api/get-post-data')
    res.json({
        errno: 0,
        data: req.body
    })
})

app.use((req, res, next) => {
    console.log('处理404')
    res.json({
        errno: -1,
        msn: '404 not fount'
    })
})

app.listen(3000, () => {
    console.log('server is running on port 3000')
})