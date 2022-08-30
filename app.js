/*
 * @Author: yaru.li
 * @Date: 2022-08
 * @LastEditors: yaru.li
 * @LastEditTime: 2022-08
 * @FilePath: /nodeDemo/comProject/app.js
 * @Description: 入口文件
 * 
 */

const express = require('express')
const app = express()
const joi = require('joi')
// 设置支持跨域访问
const cors = require('cors')
app.use(cors()) 

// 配置表单数据的解析;只能解析x-www-aplication/form-urlencoded
app.use(express.urlencoded({extended:false}))

// 注册全局中间件，封装res.send

app.use((req,res,next) => {

    res.cc = function(err,code = 1){
        res.send({
            code:code,
            msg:err instanceof Error ? err.message : err
        })
    }
    next()
})


// 在路由之前使用解析token的中间件

const  expressjwt = require('express-jwt')

const config = require('./config')


app.use(expressjwt({secret:config.jwtSecretKey}).unless({path:[/^\/api\//]}))

app.use((err,req,res,next) => {
    if (err instanceof joi.ValidationError) return  res.cc(err.ValidationError)
    if (err.name == 'UnauthorizedError') return res.cc('身份认证失败')
    
    return res.cc(err)
})


const userRouter = require('./router/user')
app.use('/api',userRouter)

const userInfoRouter = require('./router/userInfo')

app.use('/my',userInfoRouter)

// 文章相关
const arcitleRouter = require('./router/article')
app.use('/article',arcitleRouter)

app.listen(80,()=>{
    console.log(`this is running at 127.0.0.1`)
})