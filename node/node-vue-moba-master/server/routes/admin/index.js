module.exports = app => {

  const express = require('express')
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../modles/AdminUser')
  
  const router = express.Router({
    mergeParams: true //表示合并url参数
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
  //接口名称转换成模型名例如categories转成Category（怎么转的不理解）
  const resourceMiddleware = require('../../middleware/resource')

  //通用接口  rest/:resourcd 是动态参数，动态接口api                     
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


//----------------------------------------------appApi--------------------------------------


app.post('/admin/api/app_login', async (req, res) => {
  
  const{ user_name, user_password } = req.body
  const User = require('../../modles/User')
  const user = await User.findOne({user_name})
   if(!user){
     res.status(422).json("用户不存在");
   }

   const password = await User.findOne({ user_password})//找到密码
    if(!password){
      res.status(423).json("密码错误");
        //return res.status(423).send({message: "密码错误" })
    }
  
  //生成token
  const user_token = jwt.sign({ id: user._id }, app.get('secret'))
  //创建一个临时对象 设置token
  var userapp = {user_token: user_token};
  // 最后赋值给数据库对象 赋值好后再返回给前端
  const userback = await User.findByIdAndUpdate(user._id, userapp)
    
  //res.send('ok')
  //返回json数组要加大括号，返回对象不用加大括号
  res.status(200).json(userback);

})


app.post('/admin/api/app_create_user', async (req, res) => {

  const{ user_name, user_password } = req.body
  const User = require('../../modles/User')
  const user = await User.findOne({user_name})
  if(user){
    res.status(424).json("用户已存在");
  }
    
  const newuser = await User.create(req.body)

  //生成token
  const user_token = jwt.sign({ id: newuser._id }, app.get('secret'))
  //创建一个临时对象 设置token
  var userapp = {user_token: user_token};
  // 最后赋值给数据库对象 赋值好后再返回给前端
  const userback = await User.findByIdAndUpdate(newuser._id, userapp)
    
  //res.send('ok')
  //返回json数组要加大括号，返回对象不用加大括号
  res.status(200).json(userback);

})


app.get('/admin/api/app_video_list', async(req, res) =>{
  const video = require('../../modles/Video')
  const videos = await video.find().limit(10) // 限制10条数据
  res.status(200).json({
      videos
  });
})

//创建视频
 app.post('/admin/api/app_create_video', async (req, res) => {
  const video = require('../../modles/Video')
  const newVideo = await video.create(req.body)
  res.status(200).json(newVideo);

})

//查找该用户下的视频
app.post('/admin/api/app_find_userown_video/:id', async (req, res) => {
   const video = require('../../modles/Video')
    //通过user_id查询
   const videos = await video.find({user_id: req.params.id}).limit(10)
   res.status(200).json({
      videos
   });

})

//每次写接口，先测试接口是否通畅
// app.post("/admin", async(req, res)=>{
//   res.send('ok')
// })


//  app.post('/admin/api/login', async (req, res) =>{

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

//})

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    // console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}