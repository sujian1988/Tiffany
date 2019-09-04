module.exports = app => {

    const express = require('express')
    // express的子路由
    const router = express.Router();

    const categroy = require('../../modles/Category')
    const item = require('../../modles/Item')
    const hero = require('../../modles/Hero')

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
}