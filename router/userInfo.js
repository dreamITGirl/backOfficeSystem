/*
 * @Author: yaru.li
 * @Date: 2022-08
 * @LastEditors: yaru.li
 * @LastEditTime: 2022-08
 * @FilePath: /nodeDemo/comProject/router/userInfo.js
 * @Description: 
 * 
 */
const express = require('express')

const router = express.Router()
const userInfo = require('../routerHandler/userInfo')

// const expre = require('express-joi')
const expressJoi = require('@escook/express-joi')

const {update_user_info,uodate_user_password,update_user_avdator} = require('../schemes/user')

router.get('/userInfo',userInfo.getUserInfo)

// 更新用户信息的路由
router.post('/updateUserInfo',expressJoi(update_user_info),userInfo.updateUser)

router.post('/changePwd',expressJoi(uodate_user_password),userInfo.changePwd)

// 更新用户头像
router.post('/updateCover',expressJoi(update_user_avdator),userInfo.updateCover)


module.exports = router