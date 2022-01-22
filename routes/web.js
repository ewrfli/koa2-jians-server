const Router = require("@koa/router")
const webCtl = require("../controller/web");

const webRouter = new Router({  //unprotected无保护的
    prefix: '/web'
});

webRouter.post("/findall", webCtl.articleFindAllweb);
webRouter.post("/findone", webCtl.articleFindOneweb);

// webRouter.get("/author", webCtl.articleFindAuthor);
// webRouter.get("/stemfrom", webCtl.articleFindStemfrom);
module.exports = webRouter