const models = require('../models');
const crud = require('./crudUtil/index')

const userAdd = async (ctx) => {
    let { username = "", pwd = "" } = ctx.request.body;
    await crud.Add(models.User, { username, pwd }, ctx)
};

const userDel = async (ctx, next) => {
    let { _id } = ctx.request.body;
    await crud.Del(models.User, null, { _id },ctx)
};

const userUpdate = async (ctx, next) => {
    let params = ctx.request.body;
    await crud.Update(  //model, where, params, ctx
        models.User,
        { _id: params._id },
        {username: params.username, pwd: params.pwd}, 
        ctx
    )
};

const userFindAll = async (ctx, next) => {
    await crud.Find(models.User, null, ctx)
};

const userFindOne = async (ctx, next) => {
    await crud.FindOne(models.User, null, null,ctx)
};

module.exports = {
    userAdd,
    userDel,
    userUpdate,
    userFindAll,
    userFindOne,
};
