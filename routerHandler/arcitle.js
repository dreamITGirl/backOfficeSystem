/*
 * @Author: yaru.li
 * @Date: 2022-08
 * @LastEditors: yaru.li
 * @LastEditTime: 2022-08
 * @FilePath: /nodeDemo/comProject/routerHandler/arcitle.js
 * @Description: 文章的处理类别
 * 
 */
const db = require('../db/index')


// 查找文章类别列表
exports.articleList = (req,res) => {
    const sql = `select * from ev_article_cate where isDelete=0 and(category=? or alias = ?)`
    db.query(sql,[req.body.category,req.body.alias],(err,result) => {
        if (err) return res.cc(err)
        const r = JSON.parse(JSON.stringify(result))
        if (r.length == 0) return res.cc('该类别不存在',2)
        return res.send({code:0,message:'success',data:r})
    })
}

// 新增类别数据
exports.createArticleCate = (req,res) => {
    // 查重
    const sql = `select * from ev_article_cate where category = ? or alias = ?`
    db.query(sql,[req.body.category,req.body.alias],(err,result) => {
        if (err) return res.cc(err)
        if (result.length > 0) return res.cc('该数据已存在，请重新增加',2)
        if (result.affectedRows ) return res.cc('更新失败',3)

        const sql1 = `INSERT INTO ev_article_cate set ?`

        db.query(sql1,[req.body],(error,resultA) => {
            if (error) return res.cc(error)
            if (resultA.affectedRows != 1) return res.cc('增加类别失败')
            return res.send({code:0,message:'新增成功'})
        })  
        
    }) 
}

// 更新数据列表
exports.updateArticleCate = (req,res) => {
    const sql = `update ev_article_cate set ? where id = ?`
    db.query(sql,[req.body,req.body.id],(err,result) => {
        if (err) return res.send({code:1,msg:err.message})
        console.log(result);
        if (result.affectedRows != 1) return res.cc('更新失败')

        return res.send({code:0,msg:'更新成功'})
    })
}

// 删除列表数据
exports.deleteCate = (req,res) =>{
    const sql = `update ev_article_cate set isDelete = 1 where id = ?`

    const seSQL = `select * from ev_article_cate where id = ?`
    db.query(seSQL,[req.body.id],(err,result) => {
        if(err) return res.cc(err)
        if (!result.length) return res.cc('删除失败，该条数据不存在')

        db.query(sql,[req.body.id],(err,result) => {
            if (err) return res.send({code:1,msg:err.message})
            if (result.affectedRows != 1) return res.cc('删除失败')
    
            return res.send({code:0,msg:'删除成功'})
        })
    })


    
}

// 查询文章列表;根据
exports.getArticleList = (req,res) => {
    const sql = `select * from ev_articles where title like '%${req.query.title}%' or author like '%${req.query.author}%' `
    console.log(sql);
    db.query(sql,(err,result) =>{
        if (err) return res.cc(err)
        console.log(result.length);
        return res.send({code:0,msg:'success',data:result})
    })
}


// 新增文章接口
exports.addArticle = (req,res) => {
    console.log(req.body);
    console.log('====')
    console.log(req.file)
    const {title,author,sub_title,abstrc} = req.body
    
    const sql = `insert into ev_articles set ?`

    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')
    const resObj = {
        ...req.body,
        cover_img: path.join('/uploads', req.file.filename)
    }
    db.query(sql,resObj,(err,result) => {
        if (err) return res.cc(err)
        if (title.length > 100) return res.cc('标题长度不能超过100字',2)
        if (author.length > 45) return res.cc('作者姓名不能超过45字',2) 
        if (sub_title && sub_title.length > 100) return res.cc('副标题不能超过100字',2) 
        if (abstrc && abstrc.length > 255) return res.cc('赘述不能超过255字',2) 
        if (result.affectedRows != 1) return res.cc('更新失败',1)
        res.send({code:0,msg:' success'})
    })
}


