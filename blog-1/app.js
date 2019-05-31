//node 方法 引用
const querystring = require('querystring')
//路由 引用
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
//日志 引用 
const {
    access
} = require('./src/utils/logs')
//redis存储 引用 
const {
    get,
    set
} = require('./src/db/redis')

// session数据
// const SECCSION_DATA = {}

//设置cookie有效期
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('d.toGMTString() is', d.toGMTString())
    return d.toGMTString()
}

//用于处理 post 请求数据 data 
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        //method不是post请求，返回空
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        //headers的类型判断
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        //定义postData变量
        let postData = ''
        //data数据监听返回
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        //req结束
        req.on('end', () => {
            //判断postData为空时
            if (!postData) {
                resolve({})
                return
            }
            //最终结果
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}
//默认服务入口 
const serverHandle = ((req, res) => {

    //记录 请求成功 log
    access(
        `${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`
    )

    //设置返回格式 json
    res.setHeader('Content-type', 'application/json')
    // console.log(req.query, req.body)

    //获取路由
    const url = req.url
    req.path = url.split('?')[0]

    //解析query querystring.parse 字符串==>对象
    req.query = querystring.parse(url.split('?')[1])

    //解析cookie
    req.cookie = {}
    //请求头中获取已有cookie
    const cookieStr = req.headers.cookie || '' //格式：k1=v1;k2=v2;k3=v3
    //cookie拆分
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1]
        req.cookie[key] = val
    });
    console.log('req.cookie is', req.cookie)

    //解析session 开始无redis情况下，但些情况会暴露个人信息，并大量占用进程
    //并且服务无法存储，重起后消灭
    // let needSetCookie = false
    // let userId = req.cookie.userId
    // if (userId) {
    //     if (!SECCSION_DATA[userId]) {
    //         SECCSION_DATA[userId] = {}
    //     }
    // } else {
    //     needSetCookie = true
    //     userId = `${Date.now()}_${Math.random()}`
    //     SECCSION_DATA[userId] = {}
    // }
    // req.session = SECCSION_DATA[userId]

    // 解析 session (使用redis)
    let needSetCookie = false
    //定义userid
    let userId = req.cookie.userId
    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        //初始化 redis 中的 session值
        set(userId, {})
    }

    //获取session
    req.sessionId = userId
    get(req.sessionId)
        //第一步，redis获取session信息 
        .then(sessionData => {
            if (sessionData == null) {
                //初始化 redis 中的 session值
                set(req.sessionId, {})
                req.sessionId = {}
            } else {
                //设置session
                req.session = sessionData
            }
            console.log('req.session is', req.session)

            //处理post data
            return getPostData(req)
        })

        //第二步，处理post数据后的返回信息res
        .then(postData => {
            req.body = postData

            //处理blog路由 返回请求结果
            const blogResult = handleBlogRouter(req, res)
            if (blogResult) {
                blogResult.then(blogData => {

                    if (needSetCookie) {
                        res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                    }
                    res.end(
                        JSON.stringify(blogData)
                    )
                    // console.log(blogData)
                })
                return
            }

            //处理user路由
            const userResult = handleUserRouter(req, res)
            if (userResult) {
                userResult.then(userData => {
                    if (needSetCookie) {
                        res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                    }
                    res.end(
                        JSON.stringify(userData)
                    )
                })
                return
            }

            //未命中路由，返回404
            res.writeHead(404, {
                "Content-type": "text/plain"
            })
            res.write("404 not found")
            res.end()
        })


})

module.exports = serverHandle