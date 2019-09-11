module.exports = app => {

    const express = require('express')
    // express的子路由
    const router = express.Router();

    const categroy = require('../../modles/Category')
    const item = require('../../modles/Item')
    const hero = require('../../modles/Hero')
    const article = require('../../modles/Article')
    const ad = require('../../modles/Ad')
    const admin_user = require('../../modles/AdminUser')
    const jwt = require('jsonwebtoken')

//-------------------------------------分类------------------------------------------
    // 创建
    router.post('/categories', async(req, res) => {
        const model = await categroy.create(req.body)
        res.send(model)
    })

    //修改
    router.put('/categories/:id', async(req, res) => {
        //接收两个参数，根据id查找，然后更新body内容
        const model = await categroy.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
 
    //删除
    router.delete('/categories/:id', async(req, res) => {
        await categroy.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 获取分类列表
    router.post('/categorielist', async(req, res) => {
        //加populate是获取将parent变成对象 方便使用里面的属性
        const items = await categroy.find().populate('parent').limit(10) // 限制10条数据
        res.send(items)//将items发送给前端
    })

    //获取id
    router.get('/categoriesedit/:id', async(req, res) => {
        const model = await categroy.findById(req.params.id) 
        res.send(model)//将items发送给前端
    })

//----------------------------------------分类--------------------------------------------

//---------------------------------------武器--------------------------------------------


    // 创建
    router.post('/items', async(req, res) => {
        const model = await item.create(req.body)
        res.send(model)
    })

    //修改
    router.put('/items/:id', async(req, res) => {
        //接收两个参数，根据id查找，然后更新body内容
        const model = await item.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
 
    //删除
    router.delete('/items/:id', async(req, res) => {
        await item.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 获取分类列表
    router.post('/itemslist', async(req, res) => {
        //加populate是获取将parent变成对象 方便使用里面的属性
        const items = await item.find().populate('parent').limit(10) // 限制10条数据
        res.send(items)//将items发送给前端
    })

    //获取id
    router.get('/itemsedit/:id', async(req, res) => {
        const model = await item.findById(req.params.id) 
        res.send(model)//将items发送给前端
    })

//---------------------------------------武器--------------------------------------------



//---------------------------------------英雄--------------------------------------------

  // 创建
    router.post('/hero', async(req, res) => {
        const model = await hero.create(req.body)
        res.send(model)
    })

    //修改
    router.put('/hero/:id', async(req, res) => {
        //接收两个参数，根据id查找，然后更新body内容
        const model = await hero.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    //删除
    router.delete('/hero/:id', async(req, res) => {
        await hero.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 获取分类列表
    router.post('/heroslist', async(req, res) => {
        //加populate是获取将parent变成对象 方便使用里面的属性
        const heros = await hero.find().populate('parent').limit(10) // 限制10条数据
        res.send(heros)//将items发送给前端
    })

    //获取id
    router.get('/herosedit/:id', async(req, res) => {
        const model = await hero.findById(req.params.id) 
        res.send(model)//将items发送给前端
    })


//---------------------------------------英雄--------------------------------------------

//---------------------------------------文章--------------------------------------------

    // 创建
    router.post('/articles', async(req, res) => {
        const model = await article.create(req.body)
        res.send(model)
    })

    //修改
    router.put('/articles/:id', async(req, res) => {
        //接收两个参数，根据id查找，然后更新body内容
        const model = await article.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
 
    //删除
    router.delete('/articles/:id', async(req, res) => {
        await article.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 获取分类列表
    router.post('/articleslist', async(req, res) => {
        //加populate是获取将parent变成对象 方便使用里面的属性
        const items = await article.find().populate('parent').limit(10) // 限制10条数据
        res.send(items)//将items发送给前端
    })

    //获取id
    router.get('/articlesedit/:id', async(req, res) => {
        const model = await article.findById(req.params.id) 
        res.send(model)//将items发送给前端
    })


//---------------------------------------文章--------------------------------------------

//---------------------------------------广告位--------------------------------------------

    // 创建
    router.post('/ads', async(req, res) => {
        const model = await ad.create(req.body)
        res.send(model)
    })

    //修改
    router.put('/ads/:id', async(req, res) => {
        //接收两个参数，根据id查找，然后更新body内容
        const model = await ad.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    //删除
    router.delete('/ads/:id', async(req, res) => {
        await ad.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 获取分类列表
    router.post('/adslist', async(req, res) => {
        //加populate是获取将parent变成对象 方便使用里面的属性
        const items = await ad.find().populate('parent').limit(10) // 限制10条数据
        res.send(items)//将items发送给前端
    })

    //获取id
    router.get('/adsedit/:id', async(req, res) => {
        const model = await ad.findById(req.params.id) 
        res.send(model)//将items发送给前端
    })



//----------------------------------------广告位-------------------------------------------

//----------------------------------------管理员-------------------------------------------

      // 创建
      router.post('/admin_users', async(req, res) => {
        const model = await admin_user.create(req.body)
        res.send(model)
    })

    //修改
    router.put('/admin_users/:id', async(req, res) => {
        //接收两个参数，根据id查找，然后更新body内容
        const model = await admin_user.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    //删除
    router.delete('/admin_users/:id', async(req, res) => {
        await admin_user.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 获取分类列表
    router.post('/admin_userslist', async(req, res) => {
        //加populate是获取将parent变成对象 方便使用里面的属性
        const items = await admin_user.find().populate('parent').limit(10) // 限制10条数据
        res.send(items)//将items发送给前端
    })

    //获取id
    router.get('/admin_usersedit/:id', async(req, res) => {
        const model = await admin_user.findById(req.params.id) 
        res.send(model)//将items发送给前端
    })


//----------------------------------------管理员-------------------------------------------




 //----------------------------------------------app api---------------------------------------------------

    router.post('/categoriesapp', async(req, res) => {
        const items = await categroy.find().limit(10) // 限制10条数据
        res.status(200).json({
            items
        });
    })

    router.post('/itemsapp', async(req, res) => {
        const items = await item.find().limit(10) // 限制10条数据
        res.status(200).json({
            items
        });
    })
   
 //----------------------------------------------app api---------------------------------------------------


    // 挂在子路由
    app.use('/admin/api', router)


    const multer = require('multer')
    //当前文件夹退到上一级在退到上一级，在进入uploads
    const upload = multer({ dest: __dirname + '/../../uploads' })
    //后端接收文件                                file 字段 要和前端editview 中上传字段对应
    app.post('/admin/api/upload', upload.single('file'), async(req, res)=> {

        const file = req.file
        //生成图片url 下一步在前端显示出来itemlist.vue
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)

    })

    
    const multerhero = require('multer')
    //当前文件夹退到上一级在退到上一级，在进入uploads
    const uploadhero = multerhero({ dest: __dirname + '/../../uploads/heros' })
    app.post('/admin/api/uploadhero', uploadhero.single('file'), async(req, res)=> {

        const file = req.file
        //生成图片url 下一步在前端显示出来itemlist.vue
        file.url = `http://localhost:3000/uploads/heros/${file.filename}`
        res.send(file)

    })

    const multernew = require('multer')
    //当前文件夹退到上一级在退到上一级，在进入uploads
    const uploadnew = multernew({ dest: __dirname + '/../../uploads/news' })
    app.post('/admin/api/uploadnew', uploadnew.single('file'), async(req, res)=> {

        const file = req.file
        //生成图片url 下一步在前端显示出来itemlist.vue
        file.url = `http://localhost:3000/uploads/news/${file.filename}`
        res.send(file)

    })

    const multerad = require('multer')
    //当前文件夹退到上一级在退到上一级，在进入uploads
    const uploadad = multerad({ dest: __dirname + '/../../uploads/ads' })
    app.post('/admin/api/uploadad', uploadad.single('file'), async(req, res)=> {

        const file = req.file
        //生成图片url 下一步在前端显示出来itemlist.vue
        file.url = `http://localhost:3000/uploads/ads/${file.filename}`
        res.send(file)

    })


    //登录路由
    app.post('/admin/api/login', async (req, res) =>{

        const {username, password} = req.body
        //1 根据用户名找用户
        const adminUser = require("../../modles/AdminUser")
        const user = await adminUser.findOne({ 
            username: username 
        })//找到用户
        if(!user){
            return res.status(422).send({
                message: "用户不存在"
            })
        }
        // assert(user, 422, '用户不存在')

        // //2 校验码
        // //const isValid = require('bcrypt').compareSync(password, user.password)
        
        const user1 = await adminUser.findOne({ 
            password: password 
        })//找到用户
        if(!user1){
            return res.status(423).send({
                message: "密码错误"
            })
        }
    
        // //3 返回token
        //res.send("ok") //测试接口是通畅
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })

    })

 

    app.use(async (err, req, res, next) => {
        // console.log(err)
        res.status(err.statusCode || 500).send({
          message: err.message
        })
      })








}