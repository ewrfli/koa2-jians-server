//jwt相关工具函数 获取token 验证token
const jwt = require('jsonwebtoken')
const SIGN_KEY = 'jianshu-server-jwt'
const modelsUsers = require('../../models/users');//verifyJwtUtil需数据库找到one
//签发token 下次请求中附带在Authorization:Bearer ...Jwt...
 //这里的 Token 负载就是标识用户 ID 的对象 { id: user.id } 
 //这样后面鉴权成功后就可以通过 ctx.user.id 来获取用户 ID
class jwtUtil {
    getToken(userDate) {
        return jwt.sign(userDate, SIGN_KEY, { expiresIn: 3600 * 24 *7 })//过期时间 3600 * 24 *7
    }

    verifyToken(token) {
        return jwt.verify(token, SIGN_KEY)
    }
    ////解析token里 {username: 'qqqq',_id: '61dae237144807cea88cc7e5',iat: 1641744804,exp: 1642349604}
}

const JWT = new jwtUtil()

//登录工具函数
const LoginJwtUtil = (model, params, ctx) => (
    // console.log('params',params) params:username,pwd
    model.findOne(params)
        .then((rel) => {
            if (rel) { 
                //以username,pwd有rel代表数据库找到此用户
                // console.log('rel',rel)
                let token = JWT.getToken({username: rel.username, _id: rel._id})
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

// 验证用户登录工具函数
const verifyJwtUtil = async (ctx) => {
    // console.log('ctx.header.authorization',ctx.header.authorization)
    let token = ctx.header.authorization //签发token 下次请求中附带在authorization:Bearer ...Jwt...
    token = token.replace('Bearer ','')
    try {
        let result = JWT.verifyToken(token, SIGN_KEY) //解析token里 {username: 'qqqq',_id: '61dae237144807cea88cc7e5',iat: 1641744804,exp: 1642349604}
        // console.log('verify解析后', result)
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
                    msg: "认证失败null",
                };
            }
        })
    } catch (err) {
        ctx.body = {
            code: 500,
            msg: "认证失败err",
        };
    }
};

module.exports = {
    JWT,
    LoginJwtUtil,
    verifyJwtUtil
}