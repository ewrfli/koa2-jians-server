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
    let params = ctx.request.body; //{ _id: '61d9bba7b3217726997ba1c0', username: 'xxxcccs', pwd: '12341' }
    console.log('userUpdate,params',params)
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

// const userFindOne = async (ctx, next) => {
//     await crud.FindOne(models.User, null, null,ctx)
// };

const userFindOne = async (ctx, next) => {
    // let url =ctx.url;
    // //从上下文中直接获取
    // let ctx_query = ctx.query;
    // let ctx_querystring = ctx.querystring;
    // ctx.body={
    //     url,            //"url": "/users/find?_id=61d879208d6d8e1f764bd1ff"
    //***  ctx_query,      //{"_id": "61d879208d6d8e1f764bd1ff"}
    //     ctx_querystring //"ctx_querystring": "_id=61d879208d6d8e1f764bd1ff"
    // }

    /**
     * const FindOne = (model, params, ctx) => (
       model.findOne({ _id: params._id })
     */
    await crud.FindOne(models.User, ctx.query ,ctx)
};

module.exports = {
    userAdd,
    userDel,
    userUpdate,
    userFindAll,
    userFindOne,
};
