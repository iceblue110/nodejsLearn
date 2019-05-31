不使用框架开发server

目录结构

|-- nodejsLearn
    |-- .gitignore
    |-- app.js        请求入口，设置cookie有效期，http请求的入口和出口
    |-- dump.rdb
    |-- package-lock.json
    |-- package.json
    |-- readme.md
    |-- bin
    |   |-- www.js    启动文件
    |-- logs          日志目录
    |   |-- access.log    
    |   |-- error.log
    |   |-- event.log
    |   |-- fileName
    |-- src
        |-- conf      开发环境设置（mysql,redis）
        |   |-- db.js  
        |-- controller   每个路由数据查询（mysql查询语句）
        |   |-- blog.js
        |   |-- user.js
        |-- db          启动数据服务，连接数据存储
        |   |-- mysql.js
        |   |-- redis.js
        |-- model       数据返回信息类
        |   |-- resModel.js
        |-- router      设置路由、逻辑判断
        |   |-- blog.js
        |   |-- user.js
        |-- utils       公共组件
            |-- copy.sh   拆分日志服务 shell脚本
            |-- cryp.js   数据加密，针对密码 
            |-- logs.js   写日志
            |-- readline.js  日志分析
