const Router = require("@koa/router")
const fansCtl = require("../controller/fans");

const fansRouter = new Router({  //unprotected无保护的
    prefix: '/fans'
});

fansRouter.post("/follow", fansCtl.fansFollow); //点击关注作者
fansRouter.post("/unfollow", fansCtl.unfansFollow); //取消关注作者

fansRouter.post("/findall", fansCtl.fansFindAll);

fansRouter.post("/star", fansCtl.StarFindOne);//点赞

module.exports = fansRouter