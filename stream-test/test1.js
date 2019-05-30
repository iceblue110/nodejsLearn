//标准输入输出 linux 
// process.stdin.pipe(process.stdout)

// const http = require('http')
// const server = http.createServer((req, res) => {
//     if (req.method === 'POST') {
//         req.pipe(res) //最主要
//     }
// })
// server.listen(8080)


// //读写文件
// var readStream=fs.createReadStream(fileName1)
// var writeStream=fs.createWriteStream(fileName2)

// readStream.pipe(writeStream)

// readStream.on('end',function(){
//     console.log('拷贝成功')
// })

// //复制文件
// const fs = require('fs')
// const path = require('path')

// const fileName1 = path.resolve(__dirname, 'data.txt')
// const fileName2 = path.resolve(__dirname, 'data-bak.txt')

// const readStream = fs.createReadStream(fileName1)
// const writeStream = fs.createWriteStream(fileName2)

// readStream.pipe(writeStream)

// readStream.on('data',chunk=>{
//     console.log(chunk.toString())
// })

// readStream.on('end',()=>{
//     console.log('copy done')
// })


const http = require('http')
const fs = require('fs')
const path = require('path')
const fileName1 = path.resolve(__dirname, 'data.txt')
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        const readStream = fs.createReadStream(fileName1)
        readStream.pipe(res) //最主要
    }
})
server.listen(8080)