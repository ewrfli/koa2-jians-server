const Router = require("@koa/router")
const userCtl = require("../controller/user");

const unprotectedRouter = new Router({  //unprotected无保护的
    prefix: '/users'
});
unprotectedRouter.post("/login", userCtl.userLogin);
unprotectedRouter.post("/register", userCtl.userRegister);



const protectedUserRouter = new Router({ //有保护的
    prefix: '/users'
});

protectedUserRouter.post("/verify", userCtl.verify);

protectedUserRouter.post("/add", userCtl.userAdd);

protectedUserRouter.delete("/del", userCtl.userDel);

protectedUserRouter.put("/update", userCtl.userUpdate); //修改用户名密码

protectedUserRouter.get("/findall", userCtl.userFindAll);

// router.get("/find/:id", userCtl.userFindOne);//动态路由

protectedUserRouter.get("/find", userCtl.userFindOne);//post query参数传值


module.exports = { unprotectedRouter, protectedUserRouter };
