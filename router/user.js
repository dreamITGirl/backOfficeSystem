/*
 * @Author: yaru.li
 * @Date: 2022-08
 * @LastEditors: yaru.li
 * @LastEditTime: 2022-08
 * @FilePath: /nodeDemo/comProject/router/user.js
 * @Description: 
 * 
 */
const express = require('express')

const router = express.Router()

const userHandler = require('../routerHandler/user')
// 引入校验规则
const expressJoi = require('@escook/express-joi')

const {req_login_scheme} = require('../schemes/user')

// 1.注册新用户
router.post('/reguser',expressJoi(req_login_scheme),userHandler.reguserFunc)


// 1.登陆新用户
router.post('/login',expressJoi(req_login_scheme),userHandler.loginFunc)




module.exports = router