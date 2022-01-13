const Router = require("@koa/router")
const fansCtl = require("../controller/fans");

const fansRouter = new Router({  //unprotected无保护的
    prefix: '/fans'
});

fansRouter.post("/follow", fansCtl.fansFollow); //点击关注作者
fansRouter.post("/unfollow", fansCtl.unfansFollow); //取消关注作者


fansRouter.post("/add", fansCtl.fansAdd);
fansRouter.post("/findone", fansCtl.fansFindOne);
fansRouter.post("/findall", fansCtl.fansFindAll);//后台文章查询 可以根据。。。
// commentRouter.post("/web/findall", commentCtl.commentFindAll);//前台评论查询 根据文章id查询 /"articleId": "10101"
fansRouter.delete("/del", fansCtl.fansDel);
fansRouter.post("/update", fansCtl.fansUpdate);
module.exports = fansRouter