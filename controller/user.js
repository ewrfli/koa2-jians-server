const models = require('../models/index');
const modelsUsers = require('../models/users');
const crud = require('./crudUtil/index')
const jwt = require('jsonwebtoken')

// 验证用户登录
const verify = async (ctx) => {
    let token = ctx.header.authorization //签发token 下次请求中附带在Authorization:Bearer ...Jwt...
    token = token.replace('Bearer ','')
    try {
        let result = jwt.verify(token, 'jianshu-server-jwt') //解析token里 {username: 'qqqq',_id: '61dae237144807cea88cc7e5',iat: 1641744804,exp: 1642349604}
        await modelsUsers.Users.findOne({_id: result._id}).then(rel=>{
            if(rel){
                ctx.body = {
                    code: 200,
                    msg: "认证成功",
                    user: rel
                };
            }else {
                ctx.body = {
                    code: 500,
                    msg: "认证失败",
                };
            }
        })
    } catch (err) {
        ctx.body = {
            code: 500,
            msg: "认证失败",
        };
    }
};

//登录
const userLogin = async ctx => {
    let { username = "", pwd = "" } = ctx.request.body;
    await crud.Login(modelsUsers.Users, { username, pwd } ,ctx)
};

//注册
const userRegister = async ctx => {
    let isDouble = false
    // console.log('userRegister', ctx.request.body) { username: 'adc', pwd: '1234' }
    //注册前查询用户是否存在
    await crud.FindOne(modelsUsers.Users, ctx.request.body ,ctx)
    if(ctx.response.body.code === 200) {
        isDouble = true
        // console.log('ctx-Register',ctx.response.body.code, isDouble)
        ctx.body = {
            code: 300,
            msg: '用户已存在'
        }
        return
    }

    await crud.Add(modelsUsers.Users, ctx.request.body, ctx)
};


//添加用户
const userAdd = async (ctx) => {
    let { username = "", pwd = "" } = ctx.request.body;
    await crud.Add(modelsUsers.Users, { username, pwd }, ctx)
};


// 删除用户
const userDel = async (ctx, next) => {
    let { _id } = ctx.request.body;
    await crud.Del(modelsUsers.Users, null, { _id },ctx)
};

// 修改用户名密码
const userUpdate = async (ctx, next) => {
    let params = ctx.request.body; //{ _id: '61d9bba7b3217726997ba1c0', username: 'xxxcccs', pwd: '12341' }
    console.log('userUpdate,params',params)
    await crud.Update(  //model, where, params, ctx
        modelsUsers.Users,
        { _id: params._id },
        {
            username: params.username, 
            pwd: params.pwd,
            id: params.id,
            power: params.power,
        }, 
        ctx
    )
};

//修改用户资料
const userDataUpdate = async (ctx, next) => {
    let params = ctx.request.body; //{ _id: '61d9bba7b3217726997ba1c0', username: 'xxxcccs', pwd: '12341' }
    console.log('userDataUpdate,params',params)
    await crud.Update(  //model, where, params, ctx
        modelsUsers.Users,
        { _id: params._id },
        {
            avatar: params.avatar, 
            sex: params.sex ,
            desc: params.desc ,
            phone: params.phone ,
            email: params.email 
        }, 
        ctx
    )
};

//查找所有用户
const userFindAll = async (ctx, next) => {
    await crud.Find(modelsUsers.Users, null, ctx)
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
    await crud.FindOne(modelsUsers.Users, ctx.query ,ctx)
};

module.exports = {
    verify,
    userLogin,
    userRegister,
    userAdd,
    userDel,
    userUpdate,
    userFindAll,
    userFindOne,
    userDataUpdate
    
};
