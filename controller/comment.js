const modelsArticle = require('../models/article');
const modelsComment = require('../models/comment');
const crud = require('./crudUtil')

// 添加评论
const commentAdd = async ctx => {
    let {id = "",username="",articleAuthor="",articleTitle="",articleId="",commentContent="",commentCreateTime=""} = ctx.request.body;
    if(!id){
        id = Date.now()
    }
    await crud.Add(modelsComment.Comments, {id,username,articleAuthor,articleTitle,articleId,commentContent,commentCreateTime}, ctx)

    if(ctx.response.body.code === 200){ //找到了相应文章成功添加comment
        let params = {id: articleId, author: articleAuthor, title: articleTitle}
        for(let key in params){     // 删除对象中空属性值
            if(params[key] == ''){
                delete params[key]
            }
        }
        await modelsArticle.Articles.updateOne(params, {$inc: {comment: 1}})//找到相应文章comment+1
    }
}

// 删除评论
const commentDel = async ctx => {
    let {_id} = ctx.request.body;
    let params = ctx.request.body;
    console.log('commentDel', params)
    await crud.Del(modelsComment.Comments, null, { _id }, ctx)
}

// 修改评论
const commentUpdate = async ctx => {
    let params = ctx.request.body;
    console.log('commentUpdate', params)
    await crud.Update(modelsComment.Comments, 
        {_id: params._id},
        params, 
        ctx)
}


// 查找所有评论
/**
 * @param {
        id: Number,
        username: String,
        articleAuthor: String,
        articleTitle: String,
        articleId: Number,
        commentContent: String,
        commentCreateTime: String
 * }
 */
const commentFindAll = async ctx => {
    let { page } = ctx.request.body;
    let params = ctx.request.body;

    for(var key in params){ //剔除params里的page
        if(params[key] == 'page'){
           delete obj[key]
        }
     }
    console.log('commentFindAll',params)
    
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
        await modelsComment.Comments.find(params).count().then(rel=>{
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
        await modelsComment.Comments.find(params).sort('-commentCreateTime').skip(start).limit(pageSize).then(rel => {
            if(rel && rel.length > 0){
                ctx.body = {
                    code: 200,
                    msg: '评论查询成功',
                    result: rel,
                    page,
                    pageSize,
                    totalPage,
                    count
                }
            }else {
                ctx.body = {
                    code: 300,
                    msg: "查询错误或没有查询到评论"
                }
            }
        }).catch(err => {
            ctx.body = {
                code: 500,
                msg: "评论查询异常",
                err
            }
        })

    }else {
        await crud.Find(modelsComment.Comments, params, ctx) //所有查询不分页
    }
}

// 查找单条评论
const commentFindOne = async ctx => {
    let params = ctx.request.body;
    console.log('commentFindOne', params)
    await crud.FindOne(modelsComment.Comments, params, ctx)
}

module.exports = {
    commentAdd,
    commentFindAll,
    commentFindOne,
    commentDel,
    commentUpdate
}