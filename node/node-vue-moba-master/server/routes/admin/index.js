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
  const userback = await User.findByIdAndUpdate(user._id, userapp, {new : true})
    
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
    return;
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
  const userback = await User.findByIdAndUpdate(newuser._id, userapp, {new : true})
  //res.send('ok')
  //返回json数组要加大括号，返回对象不用加大括号
  res.status(200).json(userback);

})

//qq登录
app.get('/admin/api/app_qq_login/:id', async(req, res) =>{
  const user = require('../../modles/User')
  const uid = req.params.id;
  const userback = await user.findOne({uid})
  res.status(200).json(userback);
})

//自动登录
app.get('/admin/api/app_auto_login/:id', async(req, res) =>{
  const user = require('../../modles/User')
  const user_token = req.params.id;
  const userback = await user.findOne({user_token})
  res.status(200).json(userback);
})

//修改个人信息
app.post('/admin/api/app_update_user', async(req, res) =>{

  const{user_id, user_name, user_headimg, bg_img, sign_text, sex, birthday ,email, qq, weixin} = req.body
  const user = require('../../modles/User')
  const username = {user_name : user_name};
  const userheadimg = {user_headimg :user_headimg};
  const userBgImg = {bg_img : bg_img};
  const usersex = {sex: sex};
  const usersign_text = {sign_text :sign_text};
  const userbirthday = {birthday: birthday};
  const userqq = {qq: qq};
  const userweixin = {weixin: weixin};
  const useremail = {email: email};
  
  await user.findByIdAndUpdate(user_id, username);
  await user.findByIdAndUpdate(user_id, userheadimg);
  await user.findByIdAndUpdate(user_id, userBgImg);
  await user.findByIdAndUpdate(user_id, usersex);
  await user.findByIdAndUpdate(user_id, usersign_text);
  await user.findByIdAndUpdate(user_id, userbirthday);
  await user.findByIdAndUpdate(user_id, userqq);
  await user.findByIdAndUpdate(user_id, userweixin);
  const userback = await user.findByIdAndUpdate(user_id, useremail, {new : true});
  res.status(200).json(userback);

})


//添加获取maintitle接口
app.get('/admin/api/app_categories', async(req, res) =>{
  const category = require('../../modles/Category')
  const categories = await category.find({parent : req.params.id}) // 限制5条数据
  res.status(200).json({
      categories
  });
})

//获取二级分类  
app.get('/admin/api/app_categories/:id', async(req, res) =>{
  const category = require('../../modles/Category')
  const categories = await category.find({parent : req.params.id}) // 限制5条数据
  res.status(200).json({
      categories
  });
})

//获取视频列表
app.get('/admin/api/app_video_list/:id', async(req, res) =>{
  const video = require('../../modles/Video')
  //const videos = await video.find().limit(5) // 限制10条数据                           根据时间降序查询   
  const videos = await video.find({video_type : req.params.id}).skip((parseInt(req.query.page)-1) * 10).limit(10).sort({'create_time' : -1})// 限制5条数据
  res.status(200).json({
      videos
  });
})


//获取短视频接口。videotype等于1
app.get('/admin/api/app_small_video_list/:id', async(req, res) =>{
  const video = require('../../modles/Video')
  //const videos = await video.find().limit(5) // 限制10条数据                           根据时间降序查询   
  const videos = await video.find({video_type: req.params.id}).skip((parseInt(req.query.page)-1) * 50).limit(50).sort({'create_time' : -1})// 限制5条数据
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

//删除视频
app.post('/admin/api/app_delete_video/:id', async(req, res) =>{
  const videos = require('../../modles/Video')
  await videos.findByIdAndDelete(req.params.id)  
  res.status(200).json({
    success: true
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


//多表关联查询 
//通过视频id获取视频的评论和回复二级列表
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
  const changeComment = await comment.findByIdAndUpdate(newComment._id, commentidapp, {new : true})
  res.status(200).json(changeComment);
})


//发布回复评论
app.post("/admin/api/api_relaese_comment_reply", async(req, res)=> {
  const commentreply = require('../../modles/Commentreplyitem')
  const newCommentreply = await commentreply.create(req.body)
  res.status(200).json(newCommentreply);
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
  const lives = await live.find().skip((parseInt(req.query.page)-1) * 10).limit(10) // 限制5条数据
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
  const xcircle = require('../../modles/Xcircle')
  const xcircles = await xcircle.find().skip((parseInt(req.query.page)-1) * 10).limit(10).sort({'create_time' : -1}) // 限制5条数据
  res.status(200).json({
      xcircles
  });
})

//发布秀秀说说
app.post('/admin/api/app_add_xcircle', async(req, res) =>{
  const xcircles = require('../../modles/Xcircle')
  const newXcircle = await xcircles.create(req.body)
  var circleidapp = {circle_id: newXcircle._id} 
  //将_id赋值给circle_id
  const changeXcircle= await xcircles.findByIdAndUpdate(newXcircle._id,circleidapp, {new : true})
  res.status(200).json(changeXcircle);
})

//删除秀秀说说
app.post('/admin/api/app_delete_xcircle/:id', async(req, res) =>{
  const xcircles = require('../../modles/Xcircle')
  await xcircles.findByIdAndDelete(req.params.id)  
  res.status(200).json({
    success: true
  });
})

//点赞
app.post("/admin/api/app_xiuxiu_like", async(req, res)=>{
  
  const{circle_id, up, user_id } = req.body
  const xcircle = require('../../modles/Xcircle')
  var xcircleup = {up: up}
  
  const tmpXcircle = await xcircle.findOne({circle_id})
  //如果同时很多人点赞,就要判断在你点赞前。点赞数是否有变化
  if(tmpXcircle.up === up){
    res.status(424).json("点赞失败")
    return
  }
  //通过comment_id查询
  const changeComment = await xcircle.findByIdAndUpdate(circle_id, xcircleup) 
  res.status(200).json(
    "点赞成功"
  );
  //res.send(req.params.id)
})

app.post("/admin/api/app_xiuxiu_unlike", async(req, res)=>{
  
  const{circle_id, up, user_id } = req.body
  const xcircle = require('../../modles/Xcircle')
  var xcircleup = {up: up}
  
  const tmpXcircle = await xcircle.findOne({circle_id})
   
  if(tmpXcircle.up === up){
    res.status(424).json("点赞失败")
    return
  }
  //通过comment_id查询
  const changeComment = await xcircle.findByIdAndUpdate(circle_id, xcircleup) 
  res.status(200).json(
    "取消成功"
  );

})


//分享次数
app.post("/admin/api/app_xiuxiu_share", async(req, res)=>{
  
  const{circle_id, share_num, user_id } = req.body
  const xcircle = require('../../modles/Xcircle')
  var xcircleup = {share_num: share_num}
  
  const tmpXcircle = await xcircle.findOne({circle_id})
  //如果同时很多人点赞,就要判断在你点赞前。点赞数是否有变化
  if(tmpXcircle.share_num === share_num){
    res.status(424).json("分享失败")
    return
  }
  //通过comment_id查询
  const changeComment = await xcircle.findByIdAndUpdate(circle_id, xcircleup) 
  res.status(200).json(
    "分享成功"
  );
  //res.send(req.params.id)
})


//多表关联查询 
//通过视频id获取视频的评论和回复二级列表
app.post("/admin/api/app_aggregate_xcomments/:id", async(req, res)=>{
  const xcomment = require('../../modles/Xcomment')
  //通过video_id查询
 const xcomments = await xcomment.aggregate([
    {
       $match : 
       {
        "circle_id" : req.params.id,
       }
    },
    {
      $lookup:
        {
          from: "xcommentreplyitems",
          localField: "xcomment_id",
          foreignField: "xcomment_reply_id",
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
      xcomments
  });
  
})

//发布评论
app.post("/admin/api/api_relaese_xcomment", async(req, res)=> {
  const xcomment = require('../../modles/Xcomment')
  const newXcomment = await xcomment.create(req.body)
  var xcommentidapp = {xcomment_id: newXcomment._id} 
  //将_id赋值给video_id                                                                    //添加{new: true} 参数表示返回的数据是更新后的数据  
  const changeXcomment = await xcomment.findByIdAndUpdate(newXcomment._id, xcommentidapp, {new: true}) 
  res.status(200).json(changeXcomment);
})


//发布回复评论
app.post("/admin/api/api_relaese_xcomment_reply", async(req, res)=> {
  const xcommentreply = require('../../modles/Xcommentreplyitem')
  const newXcommentreply = await xcommentreply.create(req.body)
  res.status(200).json(newXcommentreply);
})


//统计评论数量
app.post("/admin/api/app_xcircle_chat_num", async(req, res)=>{
  
  const{circle_id, chat_num, user_id } = req.body
  const xcircle = require('../../modles/Xcircle')
  var xcircle_chat_num = {chat_num: chat_num}
  
  const tmpXcircle = await xcircle.findOne({circle_id})
   
  if(tmpXcircle.chat_num === chat_num){
    res.status(424).json("评论次数统计失败")
    return
  }
  //通过comment_id查询
  const changeXcircle = await xcircle.findByIdAndUpdate(circle_id, xcircle_chat_num) 
  res.status(200).json(
    "评论次数统计成功"
  );
  //res.send(req.params.id)
})

//统计视频播放次数
app.post("/admin/api/app_video_looknum", async(req, res)=>{
  
  const{video_id, looknum, user_id } = req.body
  const video = require('../../modles/Video')
  var video_looknum = {looknum: looknum}
  
  const tmpVideo = await video.findOne({video_id})
   
  if(tmpVideo.looknum === looknum){
    res.status(424).json("观看次数统计失败")
    return
  }
  //通过comment_id查询
  const changeVideo = await video.findByIdAndUpdate(video_id, video_looknum) 
  res.status(200).json(
    "观看次数统计成功"
  );
  //res.send(req.params.id)
})

//更新视频评论数
app.post("/admin/api/app_video_comments", async(req, res)=>{
  
  const{video_id, commentnum, user_id } = req.body
  const video = require('../../modles/Video')
  var video_commetnum = {commentnum: commentnum}
  
  //通过comment_id查询
  const changeVideo = await video.findByIdAndUpdate(video_id, video_commetnum) 
  res.status(200).json(
    "统计评论数成功"
  );
  //res.send(req.params.id)
})

//统计视频弹幕数
app.post("/admin/api/app_video_danmunum", async(req, res)=>{
  
  const{video_id, danmunum, user_id } = req.body
  const video = require('../../modles/Video')
  var video_danmunum = {danmunum: danmunum}
  
  const tmpVideo = await video.findOne({video_id})
   
  if(tmpVideo.danmunum === danmunum){
    res.status(424).json("弹幕统计失败")
    return
  }
  //通过comment_id查询
  const changeVideo = await video.findByIdAndUpdate(video_id, video_danmunum) 
  res.status(200).json(
    "观看次数统计成功"
  );
  //res.send(req.params.id)
})

//统计视频分享数
app.post("/admin/api/app_video_sharenum", async(req, res)=>{
  
  const{video_id, sharenum, user_id } = req.body
  const video = require('../../modles/Video')
  var video_sharenum = {sharenum: sharenum}
  
  const tmpVideo = await video.findOne({video_id})
   
  if(tmpVideo.sharenum === sharenum){
    res.status(424).json("分享统计失败")
    return
  }
  //通过comment_id查询
  const changeVideo = await video.findByIdAndUpdate(video_id, video_sharenum) 
  res.status(200).json(
    "分享次数统计成功"
  );
  //res.send(req.params.id)
})

//统计视频收藏数
app.post("/admin/api/app_video_collectnum", async(req, res)=>{
  
  const{video_id, collectnum, user_id } = req.body
  const video = require('../../modles/Video')
  var video_collectnum = {collectnum: collectnum}
  
  const tmpVideo = await video.findOne({video_id})
   
  if(tmpVideo.collectnum === collectnum){
    res.status(424).json("不能重复点赞！")
    return
  }
  //通过comment_id查询
  const changeVideo = await video.findByIdAndUpdate(video_id, video_collectnum) 
  res.status(200).json(
    "收藏次数统计成功"
  );
  //res.send(req.params.id)
})


//视频点赞
app.post("/admin/api/app_video_like", async(req, res)=>{
  
  const{video_id, up, user_id } = req.body
  const video = require('../../modles/Video')
  var videoup = {up: up}
  
  const tmpVideo = await video.findOne({video_id})
   
  if(tmpVideo.up === up){
    res.status(424).json("点赞失败")
    return
  }
  //通过comment_id查询
  const changeVideo = await video.findByIdAndUpdate(video_id, videoup) 
  res.status(200).json(
    "点赞成功"
  );
  //res.send(req.params.id)
})

//视频点赞取消
app.post("/admin/api/app_video_unlike", async(req, res)=>{
  
  const{video_id, up, user_id } = req.body
  const video = require('../../modles/Video')
  var videoup = {up: up}
  
  const tmpVideo = await video.findOne({video_id})

  if(tmpVideo.up === up){
    res.status(424).json("点赞失败")
    return
  }
  //通过comment_id查询
  const changeVideo = await video.findByIdAndUpdate(video_id, videoup) 
  res.status(200).json(
    "取消成功"
  );

})

//点赞
app.post("/admin/api/app_xcomments_like", async(req, res)=>{
  
  const{xcomment_id, other_up, user_id } = req.body
  const xcomment = require('../../modles/Xcomment')
  var xcommentup = {other_up: other_up}
  
  const tmpXcomment = await xcomment.findOne({xcomment_id})
   
  if(tmpXcomment.other_up === other_up){
    res.status(424).json("点赞失败")
    return
  }
  //通过comment_id查询
  const changeXcomment = await xcomment.findByIdAndUpdate(xcomment_id, xcommentup) 
  res.status(200).json(
    "点赞成功"
  );
  //res.send(req.params.id)
})

app.post("/admin/api/app_xcomments_unlike", async(req, res)=>{
  
  const{xcomment_id, other_up, user_id } = req.body
  const xcomment = require('../../modles/Xcomment')
  var xcommentup = {other_up: other_up}
  
  const tmpXcomment = await xcomment.findOne({xcomment_id})
   
  if(tmpXcomment.other_up === other_up){
    res.status(424).json("点赞失败")
    return
  }
  //通过comment_id查询
  const changeXcomment = await xcomment.findByIdAndUpdate(xcomment_id, xcommentup) 
  res.status(200).json(
    "取消成功"
  );

})

//个人中心 多表关联查询 
//通过视频id获取视频的评论和回复二级列表
app.post("/admin/api/app_aggregate_total_comments/:id", async(req, res)=>{
  const comment = require('../../modles/Comment')
  //通过video_id查询
 const comments = await comment.aggregate([
    {
       $match : 
       {
        "user_id" : req.params.id,
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

//查找该用户下的所有粉丝
app.post('/admin/api/app_find_userown_follow/:id', async (req, res) => {
  const follow = require('../../modles/Follow')
   //通过user_id查询
  const changeFollow = await follow.find({follow_user_id: req.params.id}).limit(100)
  res.status(200).json({
    changeFollow
  });
})

//获取你关注的偶像
app.post('/admin/api/app_find_user_follow/:id', async (req, res) => {
  const follow = require('../../modles/Follow')
   //通过user_id查询
  const changeFollow = await follow.find({user_id: req.params.id}).limit(100)
  res.status(200).json({
    changeFollow
  });
})

//关注
app.post("/admin/api/app_follow_user", async(req, res)=> {
  
  const follow = require('../../modles/Follow')
  const{follow_user_id, user_id } = req.body

  const newFollow = await follow.create(req.body)
  var followid = {mfollow_id: newFollow._id} 
  //将_id赋值给video_id
  const changeFollow = await follow.findByIdAndUpdate(newFollow._id,followid , {new : true})
  res.status(200).json({
    changeFollow
  });
})


//取消关注
app.post('/admin/api/app_unfollow_user/:id', async(req, res) =>{
  const follow = require('../../modles/Follow')
  await follow.findByIdAndDelete(req.params.id)  
  res.status(200).json({
    success: true
  });
})

//废弃 （关注数在二次关联查询就可以查出）关注成功后，要更新user的follow数量
app.post("/admin/api/app_update_follow", async(req, res)=>{
  
  const{follow, user_id } = req.body
  const user = require('../../modles/User')
  var newfollow = {follow: follow}
  const tmpFollow = await user.findOne({user_id})
  if(tmpFollow.follow === follow){
    res.status(424).json("关注失败")
    return
  }
  //通过user_id查询
  const changeUserFollow = await user.findByIdAndUpdate(user_id, newfollow) 
  res.status(200).json(
    "关注成功"
  );
})


//创建房间 2019-11-17
app.post('/admin/api/app_create_message_room', async(req, res) =>{
  const messageRoom = require('../../modles/MessageRoom')

  const{message_room_id, user_id} = req.body;
  const tmpRoom = await messageRoom.findOne({message_room_id}) //await是不许得加的否则返回结果不是最终查询后结果
  if(tmpRoom){
    res.status(200).json(tmpRoom);
    return;
  }
    
  const newMessageRoom = await messageRoom.create(req.body)
  var roomidapp = {room_id: newMessageRoom._id} 
  //将_id赋值给room_id
  const changeMessageRoom = await messageRoom.findByIdAndUpdate(newMessageRoom._id, roomidapp, {new : true})
  res.status(200).json(changeMessageRoom);
})

//消息列表 多表关联查询   2019-11-15 
//通过user_id获取房间号 再通过房间号获取消息列表
app.post("/admin/api/app_aggregate_total_messages/:id", async(req, res)=>{
  const meesageRoom = require('../../modles/MessageRoom')
  var message_room_id = req.params.id;
  //通过video_id查询
 const messageRooms = await meesageRoom.aggregate([
    {
       $match : 
       {
       'message_room_id' : {"$regex": message_room_id},   
       }
    },
    {
      $lookup:
        {
          from: "messages",
          localField: "message_room_id",
          foreignField: "message_room_id",
          as: "msgs"
        }
   },
 ]);
  res.status(200).json({
      messageRooms
  });
  
})


//获取消息列表 2019-11-15 废弃
app.post('/admin/api/app_message_list/:id', async(req, res) =>{
  const message = require('../../modles/Message')
  const messages = await message.find({user_id: req.params.id}).limit(100) // 限制5条数据
  res.status(200).json({
    messages
  });
})

//发送消息 2019-11-15
app.post('/admin/api/app_add_message', async(req, res) =>{
  const messages = require('../../modles/Message')
  const newMessage = await messages.create(req.body)
  var messageidapp = {message_id: newMessage._id} 
  //将_id赋值给circle_id
  const changeMessage= await messages.findByIdAndUpdate(newMessage._id, messageidapp, {new : true})
  res.status(200).json(changeMessage);
})

//***************************************************************************************** */
//删除房间   app执行接口，先删除房间，再删除消息 2019-11-19
app.post('/admin/api/app_delete_message_room/:id', async(req, res) =>{
  const messageRoom = require('../../modles/MessageRoom')
  await messageRoom.deleteMany({message_room_id : req.params.id})    //findbyidandDelete只能删除一条数据 使用message_room_id数据库会报错
  res.status(200).json({
    success: true
  });
})


//批量删除消息 2019-11-15
app.post('/admin/api/app_delete_message/:id', async(req, res) =>{
  const message = require('../../modles/Message')
  //const messages = message.findByIdAndUpdate(req.params.id);
  await message.deleteMany({message_room_id: req.params.id})  
  res.status(200).json({
    success: true
  });
})
//***************************************************************************************** */


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