const jwt = require('jsonwebtoken')

const Login = (model, params, ctx) => (
    // console.log('params',params)
    model.findOne(params)//
        .then((rel) => {
            if (rel) { //有rel代表数据库找到此用户
                let token = jwt.sign({  //签发token 下次请求中附带在Authorization:Bearer ...Jwt...
                    username: rel.username,  //这里的 Token 负载就是标识用户 ID 的对象 { id: user.id } ，这样后面鉴权成功后就可以通过 ctx.user.id 来获取用户 ID
                    _id: rel._id
                },'jianshu-server-jwt',{
                    expiresIn: 3600*24*7
                })

                ctx.body = {
                    code: 200,
                    msg: "登录成功",
                    reslut: rel, 
                    token
                };
            } else {
                ctx.body = {
                    code: 300,
                    msg: "登录失败用户名密码错误或不存在",
                };
            }
        })
        .catch((err) => {
            ctx.body = {
                code: 400,
                msg: "登录异常",
            };
            console.error(err);
        })
)

/**
 * 
 * @param {*} model 
 * @param {*} params 
 * @param {*} ctx 
 * @returns 
 */
 const Add = (model, params, ctx) => (
    model.create(params) //{ username, pwd }
    .then((rel) => {
        if (rel) {
            ctx.body = {
                code: 200,
                msg: "添加成功",
                data: rel,
            };
        } else {
            ctx.body = {
                code: 300,
                msg: "添加失败",
            };
        }
    })
    .catch((err) => {
        ctx.body = {
            code: 400,
            msg: "添加异常",
        };
        console.error(err);
    })
)
/**
 * 
 * @param {*} model 
 * @param {*} where 
 * @param {*} params 
 * @param {*} ctx 
 * @returns 
 */
const Del = (model, where, params, ctx) => (
    model.findOneAndDelete(params)//{ _id }
    .then((rel) => {
        if (rel) {
            ctx.body = {
                code: 200,
                msg: "删除成功",
                reslut: rel, //返回删除对象
            };
        } else {
            ctx.body = {
                code: 300,
                msg: "删除失败",
            };
        }
    })
    .catch((err) => {
        ctx.body = {
            code: 400,
            msg: "删除异常",
        };
        console.error(err);
    })
)

/**
 * 修改用户的公共方法
 * @param {*} model 
 * @param {*} where 
 * @param {*} params 
 * @param {*} ctx 
 * @returns 
 */
const Update = (model, where, params, ctx) => (
    model.updateOne(where, params)                                                            //{ _id: params._id },{username: params.username,pwd: params.pwd,}
        .then((rel) => {
            if (rel) {
                ctx.body = {
                    code: 200,
                    msg: "修改成功",
                    reslut: rel,
                };
            } else {
                ctx.body = {
                    code: 300,
                    msg: "修改失败",
                    data: rel,
                };
            }
        })
        .catch((err) => {
            ctx.body = {
                code: 400,
                msg: "修改异常",
            };
            console.error(err);
        })
)

/**
 * 
 * @param {*} model 
 * @param {*} where 
 * @param {*} ctx 
 * @returns 
 */
const Find = (model, where, ctx) => (
    model.find(where)
    .then(rel => {
        if (rel) {
            ctx.body = {
                code: 200,
                msg: "成功",
                reslut: rel, 
            };
        } else {
            ctx.body = {
                code: 300,
                msg: "失败",
            };
        }
    })
    .catch(err => {
        ctx.body = {
            code: 400,
            msg: "异常",
        };
        console.error(err);
    })
)
/**
 * 
 * @param {*} model 
 * @param {*} where 
 * @param {*} params 
 * @param {*} ctx 
 * @returns 
 */
const FindOne = (model, params, ctx) => (
    model.findOne(params)//
        .then((rel) => {
            if (rel) {

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
                msg: "异常",
            };
            console.error(err);
        })
)

module.exports = {
    Login,
    Add,
    Del,
    Update,
    Find,
    FindOne
}