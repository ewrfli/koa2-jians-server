const Router = require("@koa/router")
const uploadCtl = require("../controller/upload");

const protectedUploadRouter = new Router({ //有保护的路由
    prefix: '/upload'
});


protectedUploadRouter.post("/img", uploadCtl.uploadSin, uploadCtl.uploadImg);//头像
protectedUploadRouter.post("/editor/img", uploadCtl.editorUploadSin, uploadCtl.editorUploadImg);//文章图片
module.exports = protectedUploadRouter