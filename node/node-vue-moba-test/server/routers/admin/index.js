module.exports = app => {

    const express = require('express')
    // express的子路由
    const router = express.Router();

    const categroy = require('../../modles/Category')

    router.post('/categories', async(req, res) => {
        const model = await categroy.create(req.body)
        res.send(model)
    })

    // 挂在子路由
    app.use('/admin/api', router)

}