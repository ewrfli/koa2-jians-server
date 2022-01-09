const router = require("koa-router")();
const userCtl = require("../controller/user");
router.prefix("/users");

router.post("/add", userCtl.userAdd);

router.delete("/del", userCtl.userDel);

router.put("/update", userCtl.userUpdate);

router.get("/findall", userCtl.userFindAll);

// router.get("/find/:id", userCtl.userFindOne);//动态路由

router.get("/find", userCtl.userFindOne);//query参数传值
module.exports = router;
