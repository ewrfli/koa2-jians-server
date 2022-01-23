const modelsArticle = require('../models/article');
const modelsComment = require('../models/comment');
const fansComment = require('../models/fans');
const crud = require('./crudUtil')

//关注作者
const fansFollow = async ctx => {
    let fans = ctx.request.body
    await fansComment.Fans.create(fans).then(rel=>{
        if(rel){
            ctx.body = {
                code: 200,
                msg: '关注成功',
                result: rel
            }
        }else {
            ctx.body = {
                code: 300,
                msg: "关注失败"
            }
        }
    }).catch(err=>{
        ctx.body = {
            code: 500,
            msg: "关注时出现异常",
            err
        }
    })
}

const unfansFollow = async ctx => {
    let {username, author} = ctx.request.body
    await fansComment.Fans.findOneAndDelete({username,author}).then(rel=>{
        if(rel){
            ctx.body = {
                code: 200,
                msg: '取关成功',
                result: rel
            }
        }else {
            ctx.body = {
                code: 300,
                msg: "取关失败"
            }
        }
    }).catch(err=>{
        ctx.body = {
            code: 500,
            msg: "取关时出现异常",
            err
        }
    })
}


const fansFindAll = async ctx => {
    let { page } = ctx.request.body;
    let params = ctx.request.body; //一般author

    for(var key in params){ //剔除params里的page
        if(params[key] == 'page'){
           delete obj[key]
        }
     }
    console.log('fansFindAll',params)
    
    //如果参数有page则进行分页查询 {page:1, username: xm }  //所有查询 {username: xm}
    if(page || page===''){ 
        //判断页码
        if(!page || isNaN(Number(page))){
            page = 1
        }else{
            page = Number(page)
        }
        //每页条数
        let pageSize = 5;
        //计算总条数
        let count = 0
        await fansComment.Fans.find(params).count().then(rel=>{
            count = rel
        })
        let totalPage = 0
        if(count > 0){ //总页数等于总条数除以每页条数 向上取整
            totalPage = Math.ceil(count / pageSize)
        }
        //判断当前页码的正确范围
        if(totalPage > 0 && page > totalPage){
            page = totalPage
        }else if(page < 1){
            page = 1
        }

        //计算起始位置
        let start = (page - 1) * pageSize   //limit()跨越多少个元素
        await fansComment.Fans.find(params).skip(start).limit(pageSize).then(rel => {
            if(rel && rel.length > 0){
                ctx.body = {
                    code: 200,
                    msg: '粉丝查询成功',
                    result: rel,
                    page,
                    pageSize,
                    totalPage,
                    count
                }
            }else {
                ctx.body = {
                    code: 300,
                    msg: "查询错误或没有查询到粉丝"
                }
            }
        }).catch(err => {
            ctx.body = {
                code: 500,
                msg: "粉丝查询异常",
                err
            }
        })

    }else {
        await crud.Find(fansComment.Fans, params, ctx) //所有查询不分页
    }
}

// 点赞
const StarFindOne = async ctx => {  
    let keyword = ctx.request.body;
    let isRead = false
    console.log('keyword',keyword) 
    // await crud.FindOne(modelsArticle.Articles, keyword, ctx)

    await modelsArticle.Articles.findOne(keyword)//
    .then((rel) => {
        if (rel) {
            isRead = true
            ctx.body = {
                code: 200,
                msg: "查询成功",
                reslut: rel, //返回对象
            };
        } else {
            ctx.body = {
                code: 300,
                msg: "查询失败",
            };
        }
    })
    .catch((err) => {
        ctx.body = {
            code: 400,
            msg: "查询异常",
        };
        console.error(err);
    })

    if(isRead){
        await modelsArticle.Articles.updateOne(keyword,{$inc:{star: 1}}) //$inc自增
    } 
}


module.exports = {
    fansFollow,
    unfansFollow,
    fansFindAll,
    StarFindOne
}