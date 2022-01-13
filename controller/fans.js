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

const fansAdd = async ctx => {

}

const fansDel = async ctx => {

}

const fansUpdate = async ctx => {

}


const fansFindAll = async ctx => {

}

const fansFindOne = async ctx => {

}

module.exports = {
    fansFollow,
    unfansFollow,
    fansAdd,
    fansFindAll,
    fansFindOne,
    fansDel,
    fansUpdate
}