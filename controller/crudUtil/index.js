//crud工具函数

/**
 * 
 * @param {*} model 
 * @param {*} params 
 * @param {*} ctx 
 * @returns 
 */
 const Add = (model, params, ctx) => (
    model.create(params) //{ username, pwd } //
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
    model.findOneAndDelete(params)//{ id }
    .then((rel) => {
        if (rel) {
            console.log('crudDel',params)
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
        console.error('err',err);
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
    model.updateOne(where, params)      //{ _id: params._id },{username: params.username,pwd: params.pwd,}
        .then((rel) => {
            console.log('crud update rel',rel)
            if (rel.acknowledged === true) {
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
    model.find(where).sort('-id')
    .then(rel => {
        if (rel && rel.length > 0) {
            // console.log('crudFindrel',rel)
            ctx.body = {
                code: 200,
                msg: "查询所有成功",
                reslut: rel, 
                count:rel.length
            };
        } else {
            ctx.body = {
                code: 300,
                msg: "查询所有失败",
            };
        }
    })
    .catch(err => {
        ctx.body = {
            code: 400,
            msg: "查询所有异常",
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
                msg: "查询异常",
            };
            console.error(err);
        })
)

module.exports = {
    Add,
    Del,
    Update,
    Find,
    FindOne
}