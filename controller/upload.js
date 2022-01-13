//文件上传中间件
const multer = require('koa-multer')
const fs = require('fs')
const path = require('path')

let storage = multer.diskStorage({
    // 文件保存路径
    destination: function (req, file, cb) {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      if(month < 10){
          month = '0'+String(month)
      }
      let day = date.getDate()
      let dir = "public/uploads/" + year + month + day 
      //判断目录是否存在
      if(!fs.existsSync(dir)){
          fs.mkdirSync(dir, {
              recursive: true //递归？
          })
      }  
      cb(null, dir) //文件上传到目录
    },
    
    //设置上传文件的名字
    filename: function(req, file, cb){
        let fileName = file.fieldname + '-' + Date.now() + '-' + file.originalname
        cb(null, fileName) 
    }
})

//加载配置
let upload = multer({ storage: storage })

let uploadSin = upload.single('myfile')

// 头像图片
const uploadImg = async ctx => { //myfile字段 //body form-data
    let path = ctx.req.file.path.replace('public','')
    path = ctx.origin + '' + path.replace()
    ctx.body = {
        filename: ctx.req.file.filename,//返回文件名
        path: path,
        data: ctx.req.file 
    }
}

//文章图片
let editorUploadSin = upload.single('editorFile')
const editorUploadImg = async ctx => { //file字段 //body form-data
    let path = ctx.req.file.path.replace('public','')
    path = ctx.origin + '' + path.replace()
    ctx.body = {
        errno: 0,
        data:[{
            filename: ctx.req.file.filename,//返回文件名
            data: ctx.req.file,
            url: path,
            alt: '',
            href: ''
        }]
    }
}

module.exports = {
    uploadSin,
    uploadImg,
    editorUploadSin,
    editorUploadImg
}