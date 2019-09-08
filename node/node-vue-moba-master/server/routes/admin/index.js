module.exports = app => {

  const express = require('express')
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../modles/AdminUser')
  const router = express.Router({
    mergeParams: true
  })

  // 创建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 更新资源
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 删除资源
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  // 资源列表
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(100)
    res.send(items)
  })
  
  // 资源详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')

  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

  const multer = require('multer')
  const MAO = require('multer-aliyun-oss');
  const upload = multer({
    //本地存储
    //dest: __dirname + '/../../uploads',
    // 上传云服务  
    storage: MAO({
      config: {
        region: 'oss-cn-beijing',
        accessKeyId: 'LTAI4FfRR6Xz2a47oEMLfC6q',
        accessKeySecret: 'kwdRE9uyURBr2JmOTkt77WNYLLY1p6',
        bucket: 'node-vue-moba-sj'
      }
    })
  })
  
  
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file
    //file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  //用户登录，，密码没加密可以用注释掉的方法登录 用户名sujian 密码123456
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 1.根据用户名找用户

    const user = await AdminUser.findOne({ username }).select('+password')
    assert(user, 422, '用户不存在')
    // 2.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    // 3.返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
  })
  app.post('/admin/api/login', async (req, res) =>{

  //   const {username, password} = req.body
  //   //1 根据用户名找用户
  //   const adminUser = require("../../modles/AdminUser")
  //   const user = await adminUser.findOne({  username: username })//找到用户
  //   console.log("user : " + user);
  //   if(!user){
  //       return res.status(422).send({
  //           message: "用户不存在"
  //       })
  //   }
    
  //   // const user1 = await adminUser.findOne({ 
  //   //     password: password
  //   // })//找到用户
  //   // console.log("请求password: " + password )
  //   // console.log("数据库password：" + user.findOne.password)
  //   // if(!user1){
  //   //     return res.status(423).send({
  //   //         message: "密码错误"
  //   //     })
  //   // }

  //   // //3 返回token
  //   //res.send("ok") //测试接口是通畅
  //   const token = jwt.sign({ id: user._id }, app.get('secret'))
  //   res.send({ token })

})

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    // console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}