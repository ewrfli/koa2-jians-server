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
 * 修改的公共方法
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
const FindOne = (model, where, params, ctx) => (
    model.findOne({ _id: ctx.params.id })//
        .then((rel) => {
            if (rel) {
                ctx.body = {
                    code: 200,
                    msg: "成功",
                    reslut: rel, //返回删除对象
                };
            } else {
                ctx.body = {
                    code: 300,
                    msg: "失败",
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
    Add,
    Del,
    Update,
    Find,
    FindOne
}