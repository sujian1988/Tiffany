module.exports = app => {

    const express = require('express')
    // express的子路由
    const router = express.Router({
        mergeParams: true  //表示合并url参数 否则req.params.resource是访问不到的
    });


    // 创建
    router.post('/', async(req, res) => {
        const Model = require(`../../modles/${req.params.resource}`)
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    //修改
    router.put('/:id', async(req, res) => {
        //接收两个参数，根据id查找，然后更新body内容
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
 
    //删除
    router.delete('/:id', async(req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 获取分类列表
    router.post('/', async(req, res) => {
        let queryOption = {}
        if(req.model.modeName ===  'Category'){
            queryOption.populate = 'parent'
        }
        //加populate是获取将parent变成对象 方便使用里面的属性
        const items = await Model.find().setOption(queryOption).limit(10) // 限制10条数据
        res.send(items)//将items发送给前端
    })

    //获取id
    router.get('/:id', async(req, res) => {
        const model = await req.Model.findById(req.params.id) 
        res.send(model)//将items发送给前端
    })



    //----------------------------------------------app api---------------------------------------------------

    router.post('/categoriesapp', async(req, res) => {
        const items = await req.Model.find().limit(10) // 限制10条数据
        res.status(200).json({
            items
        });
    })
   

    // 挂在子路由
    //:resource 是动态参数   添加中间件async 转换参数为类名
    app.use('/admin/api/rest/:resource', async(req,res,next) => {
        const modeName = require('inflection').classify(req.params.resource)
        req.model = require(`../../modles/${req.params.resource}`)
        next()
    }, router)

}