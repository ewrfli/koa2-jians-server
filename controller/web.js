const modelsArticle = require('../models/article');
const modelsUsers = require('../models/users');
const crud = require('./crudUtil')




// 查询所有文章 /某作者的所有文章
const articleFindAllweb = async ctx => {
    
    await modelsArticle.Articles.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "username",
                as: "users"
              }
        }
    ],function(err,docs){
        if(docs && docs.length > 0){
            // console.log(JSON.stringify(docs))
            ctx.body = {
                code: 200,
                msg: '文章查询成功',
                result: docs
            }
        }else {
            console.log('erre',err)
            ctx.body = {
                code: 300,
                msg: "查询错误或没有查询到文章",
                err: err
            }
        }
    })

    // await modelsArticle.Articles.find()
    // .then(rel => {
    //     if(rel && rel.length > 0){
    //         ctx.body = {
    //             code: 200,
    //             msg: '文章查询成功',
    //             result: rel
    //         }
    //     }else {
    //         ctx.body = {
    //             code: 300,
    //             msg: "查询错误或没有查询到文章"
    //         }
    //     }
    // }).catch(err => {
    //     ctx.body = {
    //         code: 500,
    //         msg: "文章查询异常",
    //         err
    //     }
    // })

}


const articleFindOne = async ctx => {  
    let keyword = ctx.request.body;
    let isRead = false
    console.log('keyword',keyword) 
    // await crud.FindOne(modelsArticle.Articles, keyword, ctx)

    await modelsArticle.Articles.findOne(keyword)//
    .then((rel) => {
        if (rel) {
            isRead = true
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

    if(isRead){
        await modelsArticle.Articles.updateOne(keyword,{$inc:{read: 1}}) //$inc自增
    } 
}

// 查询当前文章库所有作者
const articleFindAuthor = async ctx => {
    await modelsArticle.Articles.find()
    .then(rel=>{
        if (rel) {
            let authorArr = []
            for(item in rel){
                authorArr.push(rel[item].author)
            }
            authorArr = [...new Set(authorArr)]
            var newarr = []
            for(let i=0; i<authorArr.length;i++){
                var newobj = {}
                newobj['label'] = authorArr[i]
                console.log(newobj)
                newarr.push(newobj)
                console.log(newarr)
            }
            ctx.body = {
                code: 200,
                msg: "作者查询成功",
                reslut: newarr, //返回对象
                count: authorArr
            };
        } else {
            ctx.body = {
                code: 300,
                msg: "作者查询失败",
            };
        }
    })
    .catch((err) => {
        ctx.body = {
            code: 400,
            msg: "作者查询异常",
        };
        console.error(err);
    })
}

// 查询当前文库所有分类
const articleFindStemfrom = async ctx => {
    await modelsArticle.Articles.find()
    .then(rel=>{
        if (rel) {
            let stemfromArr = []
            for(item in rel){
                stemfromArr.push(rel[item].stemfrom)
            }
            stemfromArr = [...new Set(stemfromArr)]
            var newarr = []
            for(let i=0; i<stemfromArr.length;i++){
                var newobj = {}
                newobj['label'] = stemfromArr[i]
                console.log(newobj)
                newarr.push(newobj)
                console.log(newarr)
            }
            ctx.body = {
                code: 200,
                msg: "类别查询成功",
                reslut: newarr, //返回对象
                count: stemfromArr
            };
        } else {
            ctx.body = {
                code: 300,
                msg: "类别查询失败",
            };
        }
    })
    .catch((err) => {
        ctx.body = {
            code: 400,
            msg: "类别查询异常",
        };
        console.error(err);
    })
}

module.exports = {
    articleFindAllweb
}