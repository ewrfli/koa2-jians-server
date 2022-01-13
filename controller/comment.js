const modelsArticle = require('../models/article');
const modelsComment = require('../models/comment');
const crud = require('./crudUtil')

// 添加评论
const commentAdd = async ctx => {
    let {id = "",username="",articleAuthor="",articleTitle="",articleId="",commentContent="",commentCreateTime=""} = ctx.request.body;

    await crud.Add(modelsComment.Comments, {id,username,articleAuthor,articleTitle,articleId,commentContent,commentCreateTime}, ctx)

    if(ctx.response.body.code === 200){ //找到了相应文章 comment+1
        let params = {id: articleId, author: articleAuthor, title: articleTitle}
        for(let key in params){     // 删除对象中空属性值
            if(params[key] == ''){
                delete params[key]
            }
        }
        await modelsArticle.Articles.updateOne(params, {$inc: {comment: 1}})
    }
}

// 删除评论
const commentDel = async ctx => {
    let {title = "",createTime="",content="",stemfrom="",author=""} = ctx.request.body;
    console.log('artText',ctx.request.body)
    await crud.Add(modelsArticle.Articles, {title,createTime,content,stemfrom,author}, ctx)
}

// 修改评论
const commentUpdate = async ctx => {
    let {title = "",createTime="",content="",stemfrom="",author=""} = ctx.request.body;
    console.log('artText',ctx.request.body)
    await crud.Add(modelsArticle.Articles, {title,createTime,content,stemfrom,author}, ctx)
}

// 查找所有评论
const commentFindAll = async ctx => {
    let {title = "",createTime="",content="",stemfrom="",author=""} = ctx.request.body;
    console.log('artText',ctx.request.body)
    await crud.Add(modelsArticle.Articles, {title,createTime,content,stemfrom,author}, ctx)
}

// 操作单条评论
const commentFindOne = async ctx => {
    let {title = "",createTime="",content="",stemfrom="",author=""} = ctx.request.body;
    console.log('artText',ctx.request.body)
    await crud.Add(modelsArticle.Articles, {title,createTime,content,stemfrom,author}, ctx)
}

module.exports = {
    commentAdd,
    commentFindAll,
    commentFindOne,
    commentDel,
    commentUpdate
}