const Router = require("@koa/router")
const articleCtl = require("../controller/article");

const articleRouter = new Router({  //unprotected无保护的
    prefix: '/article'
});

articleRouter.post("/add", articleCtl.articleAdd);
articleRouter.post("/findone", articleCtl.articleFindOne); //阅读量+1
articleRouter.post("/findall", articleCtl.articleFindAll);
articleRouter.post("/del", articleCtl.articleDel);
articleRouter.post("/update", articleCtl.articleUpdate);
articleRouter.get("/author", articleCtl.articleFindAuthor);//
articleRouter.get("/stemfrom", articleCtl.articleFindStemfrom);
module.exports = articleRouter