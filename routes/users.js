const Router = require("@koa/router")
const userCtl = require("../controller/user");
const jwtUtil = require("../controller/jwtUtil");


const unprotectedRouter = new Router({  //unprotected无保护的
    prefix: '/users'
});
unprotectedRouter.post("/login", userCtl.userLogin);
unprotectedRouter.post("/register", userCtl.userRegister);


const protectedUserRouter = new Router({ //有保护的
    prefix: '/users'
});
protectedUserRouter.post("/verify", jwtUtil.verifyJwtUtil); //验证是否登录成功测试路由

protectedUserRouter.post("/add", userCtl.userAdd);

protectedUserRouter.delete("/del", userCtl.userDel);

protectedUserRouter.put("/pwdupdate", userCtl.userUpdate); //修改用户名密码

protectedUserRouter.get("/findall", userCtl.userFindAll);

// router.get("/find/:id", userCtl.userFindOne);//动态路由

protectedUserRouter.get("/find", userCtl.userFindOne);//post query参数传值

protectedUserRouter.put("/dataupdate", userCtl.userDataUpdate); //修改用户资料

module.exports = { unprotectedRouter, protectedUserRouter };
