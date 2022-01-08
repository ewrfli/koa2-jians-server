const router = require("koa-router")();
const userCtl = require("../controller/user");
router.prefix("/users");

router.post("/add", userCtl.userAdd);

router.delete("/del", userCtl.userDel);

router.put("/update", userCtl.userUpdate);

router.get("/find", userCtl.userFindAll);

router.get("/find/:id", userCtl.userFindOne);

module.exports = router;
