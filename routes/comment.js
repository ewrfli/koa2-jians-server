const Router = require("@koa/router")
const commentCtl = require("../controller/comment");

const commentRouter = new Router({  //unprotected无保护的
    prefix: '/comment'
});

commentRouter.post("/add", commentCtl.commentAdd);
commentRouter.post("/findone", commentCtl.commentFindOne);
commentRouter.post("/findall", commentCtl.commentFindAll);//后台文章查询 可以根据。。。
commentRouter.post("/web/findall", commentCtl.commentFindAll);//前台评论查询 根据文章id查询 /"articleId": "10101"
commentRouter.delete("/del", commentCtl.commentDel);
commentRouter.post("/update", commentCtl.commentUpdate);
module.exports = commentRouter