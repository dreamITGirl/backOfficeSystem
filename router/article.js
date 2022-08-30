/*
 * @Author: yaru.li
 * @Date: 2022-08
 * @LastEditors: yaru.li
 * @LastEditTime: 2022-08
 * @FilePath: /nodeDemo/comProject/router/article.js
 * @Description: 文章相关路由
 * 
 */
const express = require('express')
const expressJoi = require('@escook/express-joi')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const articleCate = require('../routerHandler/arcitle')
const { categoryType ,create_article} = require('../schemes/article')

const upload = multer({ dest: path.join(__dirname, '../uploads') })

// 查找文章类别列表
router.get('/typeList',articleCate.articleList)
// 新增文章类别列表
router.post('/typeCreate',expressJoi(categoryType),articleCate.createArticleCate)
// 更新类别列表
router.post('/updateCate',expressJoi(categoryType),articleCate.updateArticleCate)

// 删除
router.delete('/deleteCate',articleCate.deleteCate)

// 查找文章列表数据
router.get('/artileList',articleCate.getArticleList)

// 新增文章接口
router.post('/addArticle',upload.single('cover'),expressJoi(create_article),articleCate.addArticle)



module.exports = router