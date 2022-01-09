// const Router = require("koa-router")();
const Router = require("@koa/router")
const userCtl = require("../controller/user");
// Router.prefix("/users");
const router = new Router({
    prefix: '/users'
  });
  
const unprotectedRouter = new Router(); //unprotected无保护的
unprotectedRouter.post("/login", userCtl.userLogin);

unprotectedRouter.post("/register", userCtl.userRegister);

const protectedRouter = new Router();//有保护的
protectedRouter.post("/add", userCtl.userAdd);

protectedRouter.delete("/del", userCtl.userDel);

protectedRouter.put("/update", userCtl.userUpdate);

protectedRouter.get("/findall", userCtl.userFindAll);

// router.get("/find/:id", userCtl.userFindOne);//动态路由

protectedRouter.get("/find", userCtl.userFindOne);//post query参数传值


module.exports = router;
