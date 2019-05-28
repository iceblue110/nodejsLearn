const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const {
    get,
    set
} = require('./src/db/redis')

//session数据
// const SECCSION_DATA = {}

//设置cookie有效期
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('d.toGMTString() is', d.toGMTString())
    return d.toGMTString()
}

//用于处理post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = ((req, res) => {
    //设置返回格式 json
    res.setHeader('Content-type', 'application/json')
    console.log(req.query,req.body)
    //获取path
    const url = req.url
    req.path = url.split('?')[0]

    //解析query
    req.query = querystring.parse(url.split('?')[1])

    //解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '' //格式：k1=v1;k2=v2;k3=v3
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

    //解析session
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

    //解析 session (使用redis)
    let needSetCookie = false
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
        .then(postData => {
            req.body = postData

            //处理blog路由
            // const blogData = handleBlogRouter(req, res)
            // if (blogData) {
            //     res.end(
            //         JSON.stringify(blogData)
            //     )
            //     return
            // }
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
            // const userData = handleUserRouter(req, res)
            // if (userData) {
            //     res.end(
            //         JSON.stringify(userData)
            //     )
            //     return
            // }
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