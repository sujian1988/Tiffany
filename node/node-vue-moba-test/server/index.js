const express = require("express")

const app = express()

app.set('secret', '123456')

//跨域模块
app.use(require('cors')())
//添加中间件才可以用数据库
app.use(express.json())

//静态托管文件
app.use("/uploads", express.static(__dirname + '/uploads'))
app.use("/uploadshero", express.static(__dirname + '/uploads/heros'))

//引入数据库
require('./plugins/db')(app)

//把app传给./routers/admin这个文件夹下供使用
require('./routers/admin')(app)

app.listen(3000, () =>{
    console.log('http://localhost:3000');
});