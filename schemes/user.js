/*
 * @Author: yaru.li
 * @Date: 2022-08
 * @LastEditors: yaru.li
 * @LastEditTime: 2022-08
 * @FilePath: /nodeDemo/comProject/schemes/user.js
 * @Description: 验证表单规则
 * 
 */

const joi = require('joi')

const username = joi.string().alphanum().min(2).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

const email = joi.string().email().required()
const nick_name = joi.string().required()
const id = joi.number().integer().min(1).required()

exports.req_login_scheme = {
    body:{
        username,
        password
    }
}

exports.update_user_info = {
    body:{
        email,
        nick_name,
        id
    }
}

// 更新密码
exports.uodate_user_password = {
    body:{
        oldPwd:password,
        newPwd:joi.not(joi.ref('oldPwd')).concat(password)
    }
}

// 上传用户头像
exports.update_user_avdator = {
    body:{
        avdator:joi.string().base64().required()
    }
}