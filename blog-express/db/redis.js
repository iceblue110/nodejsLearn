//node 方法
const redis = require('redis')
//环境变量
const {
    REDIS_CONF
} = require('../conf/db')

//创建客户端  需要启动redis-server
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.error(err)
})

module.exports = redisClient
//写入redis  
// function set(key, val) {
//     //判断类型
//     if (typeof val === 'object') {
//         val = JSON.stringify(val)
//     }
//     //写入userid对应的session值
//     redisClient.set(key, val, redis.print)
// }
// //获取redis
// function get(key) {
//     const promise = new Promise((resolve, reject) => {
//         redisClient.get(key, (err, val) => {
//             if (err) {
//                 reject(err)
//                 return
//             }
//             if (val == null) {
//                 resolve(null)
//                 return
//             }

//             try {
//                 resolve(
//                     JSON.parse(val)
//                 )
//             } catch (ex) {
//                 resolve(val)
//             }
//         })
//     })
//     return promise

// }

// module.exports = {
//     set,
//     get
// }