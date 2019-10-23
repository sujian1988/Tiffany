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


//获取版本号
app.post('/admin/api/app_update_version/', async (req, res) => {
  const mversion = require('../../modles/Version')
   //通过user_id查询
  const version = await mversion.findOne();
  res.status(200).json(version);

})


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
  var useridapp = {user_id: newuser._id} 
  //将_id赋值给user_id
  await User.findByIdAndUpdate(newuser._id, useridapp)
  // 最后赋值给数据库对象 赋值好后再返回给前端 
  const userback = await User.findByIdAndUpdate(newuser._id, userapp)
  //res.send('ok')
  //返回json数组要加大括号，返回对象不用加大括号
  res.status(200).json(userback);

})

//添加获取maintitle接口
app.get('/admin/api/app_categories', async(req, res) =>{
  const category = require('../../modles/Category')
  const categories = await category.find() // 限制5条数据
  res.status(200).json({
      categories
  });
})


app.get('/admin/api/app_video_list', async(req, res) =>{
  const video = require('../../modles/Video')
  //const videos = await video.find().limit(5) // 限制10条数据                           根据时间降序查询   
  const videos = await video.find().skip((parseInt(req.query.page)-1) * 10).limit(10).sort({'create_time' : -1})// 限制5条数据
  res.status(200).json({
      videos
  });
})

//创建视频
 app.post('/admin/api/app_create_video', async (req, res) => {
  const video = require('../../modles/Video')
  const newVideo = await video.create(req.body)
  var videoidapp = {video_id: newVideo._id} 
  //将_id赋值给video_id
  const changeVideo = await video.findByIdAndUpdate(newVideo._id,videoidapp)
  res.status(200).json(changeVideo);

})

//查找该用户下的视频
app.post('/admin/api/app_find_userown_video/:id', async (req, res) => {
   const video = require('../../modles/Video')
    //通过user_id查询
   const videos = await video.find({user_id: req.params.id}).skip((parseInt(req.query.page)-1) * 5).limit(5)
   res.status(200).json({
      videos
   });

})

//通过视频id获取视频的评论列表
app.post("/admin/api/app_comments/:id", async(req, res)=>{
  const comment = require('../../modles/Comment')
  //通过video_id查询
 const comments = await comment.find({video_id: req.params.id}).skip((parseInt(req.query.page)-1) * 5).limit(5)
 res.status(200).json({
    comments
 });
  //res.send(req.params.id)
})

//******************************************************************************************* */

//废弃
// app.post("/admin/api/app_commentreplys", async(req, res)=>{
//   const comment = require('../../modles/CommentReplyItem')
//   //通过video_id查询
//  const comments = await comment.find({video_id: req.params.id}).skip((parseInt(req.query.page)-1) * 5).limit(5)
//  res.status(200).json({
//     comments
//  });
//   //res.send(req.params.id)
// })


//多表通过视频id获取视频的评论和回复二级列表
app.post("/admin/api/app_aggregate_comments/:id", async(req, res)=>{
  const comment = require('../../modles/Comment')
  //通过video_id查询
 const comments = await comment.aggregate([
    {
       $match : 
       {
        "video_id" : req.params.id,
       }
    },
    {
      $lookup:
        {
          from: "commentreplyitems",
          localField: "comment_id",
          foreignField: "comment_reply_id",
          as: "items"
        }
   },
  
   {
     $skip : ((parseInt(req.query.page)-1) * 5)
   },

   {
    $limit: 5
   },

 ]);
  res.status(200).json({
      comments
  });
  
})

//***************************************************************************************** */

//废弃
app.post("/admin/api/app_comment_reply/:id", async(req, res)=>{
  
  const comment = require('../../modles/Comment')
  //通过user_id查询
 const comments = await comment.find({reply_user_id: req.params.id}).limit(10)

  res.status(200).json({
    comments
  });

})



//发布评论
app.post("/admin/api/api_relaese_comment", async(req, res)=> {
  const comment = require('../../modles/Comment')
  const newComment = await comment.create(req.body)
  var commentidapp = {comment_id: newComment._id} 
  //将_id赋值给video_id
  const changeComment = await comment.findByIdAndUpdate(newComment._id, commentidapp)
  res.status(200).json(changeComment);
})


//发布回复评论
app.post("/admin/api/api_relaese_comment_reply", async(req, res)=> {
  const comment = require('../../modles/CommentReplyItem')
  const newComment = await comment.create(req.body)
  res.status(200).json(newComment);
})

//回复视频地下的评论
// app.post('/admin/api/api_relaese_comment_reply', async (req, res) => {
//   const r = require('../../modles/CommentReplyItem')
//   const rr = await r.create(req.body)
//   var a = {comment_reply_id: rr._id} 
//   //将_id赋值给video_id
//   const changeComment = await r.findByIdAndUpdate(rr._id, a)
//   res.status(200).json(changeComment);
// })



//点赞
app.post("/admin/api/app_comments_like", async(req, res)=>{
  
  const{comment_id, other_up, user_id } = req.body
  const comment = require('../../modles/Comment')
  var commentup = {other_up: other_up}
  
  const tmpComment = await comment.findOne({comment_id})
   
  if(tmpComment.other_up === other_up){
    res.status(424).json("点赞失败")
    return
  }
  //通过comment_id查询
  const changeComment = await comment.findByIdAndUpdate(comment_id, commentup) 
  res.status(200).json(
    "点赞成功"
  );
  //res.send(req.params.id)
})

app.post("/admin/api/app_comments_unlike", async(req, res)=>{
  
  const{comment_id, other_up, user_id } = req.body
  const comment = require('../../modles/Comment')
  var commentup = {other_up: other_up}
  
  const tmpComment = await comment.findOne({comment_id})
   
  if(tmpComment.other_up === other_up){
    res.status(424).json("点赞失败")
    return
  }
  //通过comment_id查询
  const changeComment = await comment.findByIdAndUpdate(comment_id, commentup) 
  res.status(200).json(
    "取消成功"
  );

})



//创建直播
app.post('/admin/api/app_create_live', async (req, res) => {
  const live = require('../../modles/Live')
  const newLive = await live.create(req.body)
  var liveidapp = {mliveId: newLive._id} 
  //将_id赋值给mliveId
  const changeLive= await live.findByIdAndUpdate(newLive._id,liveidapp)
  res.status(200).json(changeLive);

})

//获取个人直播列表
app.post('/admin/api/app_user_live_list/:id', async (req, res) => {
  const live = require('../../modles/Live')
   //通过user_id查询
  const lives = await live.find({user_id: req.params.id}).skip((parseInt(req.query.page)-1) * 10).limit(10).sort({'create_time' : -1})
  //res.send(req.params.id);
  res.status(200).json({
     lives
  });

})

//获取直播列表
app.get('/admin/api/app_live_list', async(req, res) =>{
  const live = require('../../modles/Live')
  const lives = await live.find().skip((parseInt(req.query.page)-1) * 5).limit(5) // 限制5条数据
  res.status(200).json({
      lives
  });
})

//创建弹幕
app.post('/admin/api/app_add_dandiscuss', async(req, res) =>{
  const danDiscuss = require('../../modles/DanDiscuss')
  const newDanDiscuss = await danDiscuss.create(req.body)
  res.status(200).json(newDanDiscuss);
})

//获取某视频的弹幕列表
app.post('/admin/api/app_dandiscuss_list/:id', async (req, res) => {
  const danDiscuss = require('../../modles/DanDiscuss')
   //通过user_id查询
  //const danDiscusses = await danDiscuss.find({video_id: req.params.id})
  const danDiscusses = await danDiscuss.aggregate([
    
    {
       $match : 
       {
        "video_id" : req.params.id,
       }
    },
    {
      $project : 
        {
          _id:0,
          c:1, 
          m:1
        }

    }
 ]);
  res.status(200).json(
    danDiscusses
  );

})


//获取秀秀圈列表
app.get('/admin/api/app_xcircle_list', async(req, res) =>{
  const XCircle = require('../../modles/XCircle')
  const xcircles = await XCircle.find().skip((parseInt(req.query.page)-1) * 5).limit(5) // 限制5条数据
  res.status(200).json({
      xcircles
  });
})

//创建弹幕
app.post('/admin/api/app_add_xcircle', async(req, res) =>{
  const xcircles = require('../../modles/XCircle')
  const newXcircle = await xcircles.create(req.body)
  res.status(200).json(newXcircle);
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