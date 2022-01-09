const multer = require('koa-multer')
const fs = require('fs')
const path = require('path')
const Router = require("@koa/router")
const userCtl = require("../controller/user");

const protectedUploadRouter = new Router({ //有保护的
    prefix: '/upload'
});

let upload = multer({ //中间件
    //设置文件存储位置
    // destination: function(req, file, cb){
    //   let date = new Date()
    //   let year = date.getFullYear()
    //   let month = date.getMonth() + 1
    //   let day = date.getDate()
    //   let dir = "/public/uploads/"// + year + month + day 
    //   //判断目录是否存在
    //   if(!fs.existsSync(dir)){
    //       fs.mkdirSync(dir, {
    //           recursive: true //递归？
    //       })
    //   }  

    //   cb(null, path.join(__dirname, 'public/uploads/')) //文件上传到目录
    // },
    // //文件名称
    // filename: function(req, file, cb){
    //     // let fileName = file.filename + '-' + Date.now() + path.extname(file.originalname)
    //     let fileFormat = (file.originalname).split(".");
    //     cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    //     // cb(null, fileName) //设置上传文件的名字
    // }

    dest: 'public/uploads/'
})

protectedUploadRouter.post("/img", upload.single('myfile'), async ctx => { //myfile字段 //body form-data
    ctx.body = {
        filename: ctx.req.file.filename,//返回文件名
        data: ctx.req.file //地址
    }
});

module.exports = protectedUploadRouter