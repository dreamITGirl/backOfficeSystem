/*
 * @Author: yaru.li
 * @Date: 2022-08
 * @LastEditors: yaru.li
 * @LastEditTime: 2022-08
 * @FilePath: /nodeDemo/comProject/routerHandler/userInfo.js
 * @Description: 
 * 
 */
const db = require('../db/index')
const bcrypt= require('bcrypt')

exports.getUserInfo = (req,res) => {
    const sql = `select user_name , user_pic,email,nick_name from ev_users where id = ?`
    db.query(sql,req.user.id,(err,result) => {
        if (err) return res.cc(err)
        res.send({code:0,data:result,msg:'success'})
    })
}

exports.updateUser = (req,res) => {
    const userInfo = req.body
    const sql = `update ev_users set ? where id = ?`
    db.query(sql,[req.body,req.body.id],(err,result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !=1)  return res.cc('更新失败')
        
        return res.send({code:0,msg:'success'})
    })
}

exports.changePwd = (req,res) => {
    const reqParams = req.body
    const userInfo = req.user
    const ID = userInfo.id
    const sql = `update ev_users set password = ? where id=${ID}`
    const selSql = `select * from ev_users where id=${ID}`
    const newPwd = bcrypt.hashSync(reqParams.newPwd,10)
    const isSame = bcrypt.compareSync(reqParams.oldPwd,newPwd)
    
    db.query(selSql,(err,result) => {
        if (err) return err
        const r = JSON.parse(JSON.stringify(result))
        if (!r.length) return res.cc('该用户不存在',4)
        if (isSame) return res.cc('新密码与旧密码相同，请重新设置',5)
        if (result.affectedRows != 1) return res.cc('更新失败')
        return res.send({code:0,msg:'修改成功'})
    })
}

// 更新头像
exports.updateCover = (res,req) => {
    const sql = `update ev_users set user_pic = ? where id = ?`
    db.query(sql,[res.body.avdator,req.user.id],(err,result) => {
        const r = JSON.parse(JSON.stringify(result))
        if (r.length == 0) return res.cc('用户不存在',4)
        if (err) return res.cc('更新失败')
        if (result.affectedRows != 1) return res.cc('更新失败',2)
        return res.send({code:0,msg:'success'})
    })
}