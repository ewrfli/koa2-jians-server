const modelsArticle = require('../models/article');
const crud = require('./crudUtil')

//发布文章
const articleAdd = async ctx => {
    let {title = "",createTime="",content="",stemfrom=""} = ctx.request.body;
    console.log('artText',ctx.request.body)
    await crud.Add(modelsArticle.Articles, {title,createTime,content,stemfrom}, ctx)
}

//删除文章
const articleDel = async ctx => {
    let { _id } = ctx.request.body;
    await crud.Del(modelsArticle.Articles, null, { _id },ctx)
}

// 修改文章
const articleUpdate = async ctx => {
    let params = ctx.request.body;
    console.log('userUpdate,params',params)
    await crud.Update(  //model, where, params, ctx
        modelsArticle.Articles,
        { _id: params._id },
        params, 
        ctx
    )
}

// 查询所有文章 /作者的所有文章
const articleFindAll = async ctx => {
    let{ page, author, title } = ctx.request.body;
    console.log('keyword',ctx.request.body)

    if(page || page===''){ //分页查询 {page:1, author: xm }  //所有查询 {author: xm}
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
        await modelsArticle.Articles.find(ctx.request.body).count().then(rel=>{
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
        await modelsArticle.Articles.find(ctx.request.body).skip(start).limit(pageSize).then(rel => {
            if(rel && rel.length > 0){
                ctx.body = {
                    code: 200,
                    msg: '文章查询成功',
                    result: rel,
                    page,
                    pageSize,
                    totalPage,
                    count
                }
            }else {
                ctx.body = {
                    code: 300,
                    msg: "查询错误或没有查询到文章"
                }
            }
        }).catch(err => {
            ctx.body = {
                code: 500,
                msg: "文章查询异常",
                err
            }
        })

    }else {
        await crud.Find(modelsArticle.Articles, ctx.request.body, ctx) //所有查询不分页
    }


}


const articleFindOne = async ctx => {
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
        await modelsArticle.Articles.updateOne(keyword,{$inc:{read: 1}}) //$inc自增
    } 
}

module.exports = {
    articleAdd,
    articleFindAll,
    articleFindOne,
    articleDel,
    articleUpdate,
}