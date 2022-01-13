const Router = require("@koa/router")
const commentCtl = require("../controller/comment");

const commentRouter = new Router({  //unprotected无保护的
    prefix: '/comment'
});

commentRouter.post("/add", commentCtl.commentAdd);
commentRouter.post("/findone", commentCtl.commentFindOne);
commentRouter.post("/findall", commentCtl.commentFindAll);
commentRouter.delete("/del", commentCtl.commentDel);
commentRouter.post("/update", commentCtl.commentUpdate);
module.exports = commentRouter