const Router = require("@koa/router")
const articleCtl = require("../controller/article");

const articleRouter = new Router({  //unprotected无保护的
    prefix: '/article'
});

articleRouter.post("/add", articleCtl.articleAdd);
articleRouter.post("/findone", articleCtl.articleFindOne);
articleRouter.post("/findall", articleCtl.articleFindAll);
module.exports = articleRouter