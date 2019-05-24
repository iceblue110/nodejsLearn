const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    const query = querystring.parse(url.split('?')[1])

    //设置返回格式为json
    res.setHeader('Content-type', 'application/json') // 返回格式 text/html 页面

    //返回数据
    const resData = {
        method,
        url,
        path,
        query
    }

    //返回
    if (method == 'GET') {
        res.end(
            JSON.stringify(resData)
        )
    }
    if (method == 'POST') {
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            resData.postData = postData
            res.end(
                JSON.stringify(resData)
            )
        })
    }

    // if (req.method == 'GET') {
    //     console.log(req.method)
    //     const url = req.url
    //     console.log('url:', url)
    //     req.query = querystring.parse(url.split('?')[1])
    //     console.log('query:', req.query)
    //     res.end(
    //         JSON.stringify(req.query)
    //     )
    // }
    // else if (req.method == 'POST') {
    //     /* 数据格式 */
    //     console.log('req content-type', req.headers['content-type'])
    //     /* 接收数据 */
    //     let postData = ''
    //     req.on('data', chunk => {
    //         postData += chunk.toString()
    //     })
    //     req.on('end', () => {
    //         console.log('postData:', postData)
    //         res.end('hello world')
    //     })
    // }
})


server.listen(8000)
console.log('ok')