/*
 * @Author: yaru.li
 * @Date: 2022-08
 * @LastEditors: yaru.li
 * @LastEditTime: 2022-08
 * @FilePath: /nodeDemo/comProject/db/index.js
 * @Description: 
 * 
 */

const mysql = require('mysql')

const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'*****',
    database:'user_db'
})

module.exports = db