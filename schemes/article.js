/*
 * @Author: yaru.li
 * @Date: 2022-08
 * @LastEditors: yaru.li
 * @LastEditTime: 2022-08
 * @FilePath: /nodeDemo/comProject/schemes/article.js
 * @Description: 文章相关校验
 * 
 */
const joi = require('joi')

const category = joi.string().required()
const alias = joi.string().required()
const remark = joi.string().max(255)
const id = joi.number().min(1)

const title = joi.string().max(255).required()
const author = joi.string().max(45).required()

// 定义 标题、分类Id、内容、发布状态 的验证规则
const content = joi.string().required().allow('')
const cate_id = joi.number().integer().min(1).required()

exports.categoryType = {
    body:{
        category,
        alias,
        remark,
        id
    }
}

exports.article = {
    body:{
        title,
        author,
        
        
    }
}

exports.create_article = {
    body:{
        title,
        author,
        content,
        cate_id
        
    }
}