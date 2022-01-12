const modelsArticle = require('../models/article');
const crud = require('./crudUtil')

//发布文章
const articleAdd = async ctx => {
    let artText = ctx.request.body;
    console.log('artText',artText)
    await crud.Add(modelsArticle.Articles, artText, ctx)
}
//删除文章

// 修改文章

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
        await modelsArticle.Articles.find({author}).count().then(rel=>{
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
        await modelsArticle.Articles.find({author}).skip(start).limit(pageSize).then(rel => {
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
    console.log('keyword',keyword)
    await crud.FindOne(modelsArticle.Articles, keyword, ctx)
}

module.exports = {
    articleAdd,
    articleFindAll,
    articleFindOne
}