const modelsArticle = require('../models/article');
const modelsUsers = require('../models/users');
const crud = require('./crudUtil')




// 查询所有文章 /某作者的所有文章
const articleFindAllweb = async ctx => {
    let{ page, author, title } = ctx.request.body;
    //
    if(page || page===''){ //分页查询 {page:1, author: xm }  //所有查询 {author: xm}
        //判断页码
        if(!page || isNaN(Number(page))){
            page = 1
        }else{
            page = Number(page)
        }
        //每页条数
        let pageSize = 5;
        //计算总条数
        let count = 0
        await modelsArticle.Articles.find(ctx.request.body).count().then(rel=>{
            count = rel
        })
        let totalPage = 0
        if(count > 0){ //总页数等于总条数除以每页条数 向上取整
            totalPage = Math.ceil(count / pageSize)
        }
        //判断当前页码的正确范围
        if(totalPage > 0 && page > totalPage){
            page = totalPage
        }else if(page < 1){
            page = 1
        }

        //计算起始位置
        let start = (page - 1) * pageSize   //limit()跨越多少个元素
        console.log('start',start)
        await modelsArticle.Articles.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "username",
                    as: "user"
                }
            },
            {$sort: { "createTime" : -1}},
            {$skip : start},
            {$limit : pageSize}

        ],function(err,docs){
            if(docs && docs.length > 0){
                // console.log(JSON.stringify(docs))
                ctx.body = {
                    code: 200,
                    msg: '文章查询成功',
                    result: docs,
                    page,
                    pageSize,
                    totalPage,
                    count
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

    }else {
        await crud.Find(modelsArticle.Articles, ctx.request.body, ctx) //所有查询不分页
    }

}


const articleFindOneweb = async ctx => {  
    let {id} = ctx.request.body;
    let isRead = false
    let conditions = {
        id: id
    }
    console.log(conditions)
    let pipeLine = [
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "username",
                as: "user"
            }
        },
        { $match: conditions },
    ]
    await modelsArticle.Articles.aggregate(pipeLine, function(err,docs){
        if(docs && docs.length > 0){
            // console.log(JSON.stringify(docs))
            isRead = true
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

    if(isRead){
        await modelsArticle.Articles.updateOne(conditions,{$inc:{read: 1}}) //$inc自增
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
    articleFindAllweb,
    articleFindOneweb
}