module.exports = app => {

    const express = require('express')
    // express的子路由
    const router = express.Router();

    const categroy = require('../../modles/Category')

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
        const items = await categroy.find().limit(10) // 限制10条数据
        res.send(items)//将items发送给前端
    })

    //获取id
    router.get('/categoriesedit/:id', async(req, res) => {
        const model = await categroy.findById(req.params.id) 
        res.send(model)//将items发送给前端
    })



    //----------------------------------------------app api---------------------------------------------------

    router.post('/categoriesapp', async(req, res) => {
        const items = await categroy.find().limit(10) // 限制10条数据
        res.status(200).json({
            items
        });
    })
   

    // 挂在子路由
    app.use('/admin/api', router)

}