const mongoose = require('mongoose')

const schema = new mongoose.Schema({

    name: {type: String},
    avatar: {type: String},
    title: {type: String},
    categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
    scores: {

        difficult: {type: Number},
        skills:  {type: Number},
        attack: {type: Number},
        survive: {type: Number},

    },

    skills: [{

        icon: {type: String},
        name: {type: String},
        description: {type: String},    
        tips: {type: String},

    }],

    //两套装备
    items1: [{
        type: mongoose.SchemaTypes.ObjectId, ref: 'Item'   
    }],

    items2: [{
        type: mongoose.SchemaTypes.ObjectId, ref: 'Item'   
    }],

    //使用技巧
    usageTips: {type: String}, 

    //对战技巧
    battleTips: {type: String}, 

    //团队技巧
    teamTips: {type: String}, 

    //搭档
    partners: [{
        //通过objectId来关联英雄本类
        hero: {type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'},
        description: {type: String},

    }]

    //todo 添加更多字段
})

module.exports = mongoose.model('Hero', schema)