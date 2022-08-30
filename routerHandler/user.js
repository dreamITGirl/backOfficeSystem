/*
 * @Author: yaru.li
 * @Date: 2022-08
 * @LastEditors: yaru.li
 * @LastEditTime: 2022-08
 * @FilePath: /nodeDemo/comProject/routerHandler/user.js
 * @Description: 
 * 
 */
// 引入db 的方法
const db = require('../db/index')

// 倒入bcrypt.js
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const config = require('../config')

// 处理方法

exports.reguserFunc = (req,res) => {
    const userInfo = req.body
    // if (!userInfo.username || !userInfo.password) {
    //     // return res.send({
    //     //     code:1,
    //     //     msg:'用户名或密码不合法'
    //     // })
    //     return res.cc('用户名或密码不合法')
    // }
    const sqlStr = `select * from ev_users where user_name=?`
    db.query(sqlStr,[userInfo.username],(err,result) => {
        if (err) {
            // return res.send({code:500,msg:err.message})
            return res.cc(err.message,500)
        }
        if (JSON.parse(JSON.stringify(result)).length > 0) {
            // 说明有重名的
            // return res.send({code:1,msg:'用户名已存在'})
            return res.cc('用户名已存在')
        }
        userInfo.password =bcrypt.hashSync(userInfo.password,10)

        // 注册用户信息
        const sql = 'insert into ev_users set ?'
        db.query(sql,{user_name:userInfo.username,password:userInfo.password},(err,res) => {
            if (err) {
                return res.cc(err)
            }
            if (res.assectedRows != 1) {
                // return res.send({code:3,msg:'用户注册失败，请稍后再试'})
                return res.cc('用户注册失败，请稍后再试',3)
            }
            // return res.send({code:0,msg:'用户注册成功'})
            return res.send({code:0,message:'用户注册成功'})
        })
    })
}

exports.loginFunc = (req,res) => {
    const userInfo = req.body
   const sql = 'select * from ev_users where user_name = ?'
   const ra = []
   db.query(sql,userInfo.username,(err,result) => {
        if (err)  return  res.cc(err)
        const r = JSON.parse(JSON.stringify(result))
        if (r.length == 0) {
            res.cc('该用户尚未注册，请注册后使用')
        }
        const comRes = bcrypt.compareSync(userInfo.password,r[0].password)
        if (!comRes) return res.cc('密码输入错误，请重新输入')

        const user = {...result[0],password:"",user_pic:''}

        const token = jwt.sign(user,config.jwtSecretKey,{expiresIn:'10h'})

        res.send({code:0,token:`Bearer ${token}`,msg:'success'})
   })
   
}