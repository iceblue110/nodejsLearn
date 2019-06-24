var express = require('express');
var router = express.Router();
const {
    login,
    registerCheck
} = require('../controller/user')
const {
    SuccessModel,
    ErrorModel,
    SpecialModel
} = require('../model/resModel');

/* GET home page. */
router.post('/login', (req, res, next) => {
    //res.json()可直接返回数据 并且 直接setHeader为'Content-type', 'application/json'
    const {
        username,
        password
    } = req.body

    // const {
    //     username,
    //     password
    // } = req.query
    console.log(username, password)
    const result = login(username, password)
    return result.then(data => {
        if (data.username) {
            //设置session
            req.session.username = data.username
            req.session.realname = data.realname;
            debugger
            res.json(
                new SuccessModel()
            )
            return
        }
        res.json(
            new ErrorModel('登录失败')
        )
    })
});

router.get('/login-test', (req, res, next) => {
    if (req.session.username) {
        res.json({
            errno: 0,
            message: '已登录'
        })
        return
    }
    res.json({
        errno: -1,
        message: '未登录'
    })
})

//登录验证测试
router.get('/loginCheck', (req, res, next) => {
    //管理员界面
    // if (req.session.username) {
        res.json({
            errno: 0,
            session: req.session,
            // message: '已登录'
        })
    //     return
    // }
    // res.json(
    //     new SpecialModel('尚未登录')
    // )
    // const loginCheckResult = loginCheck(req)
    // if (loginCheckResult) {
    //     //未登录
    //     res.json(loginCheckResult)
    //     return
    // }
    // res.json(
    //     new SuccessModel({
    //         session: req.session
    //     })
    // )

})

// const loginCheck = (req) => {
//     if (!req.session.username) {
//         res.json(
//             new SpecialModel('尚未登录')
//         )
//     }
// }
// router.get('/session-test', (req, res, next) => {
//     const session = req.session
//     if (session.viewNum == null) {
//         session.viewNum = 0
//     }
//     session.viewNum++

//     res.json({
//         viewNum: session.viewNum
//     })
// })

module.exports = router;