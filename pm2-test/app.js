const http = require('http')

const server = http.createServer((req, res) => {
    //模拟日志
    console.log('cur time',Date.now())
    //模拟错误日志
    console.error('error time',Date.now())

    //模拟一个错误
    if(req.url==='/err'){
        throw new Error('/err 出错了')
    }

    //设置返回格式为json
    res.setHeader('Content-type', 'application/json') // 返回格式 text/html 页面
    res.end(
        JSON.stringify({
            errno: 0,
            msg: 'pm2 test server 3'
        })
    )

})


server.listen(8000)
console.log('server is listening on port 8000')