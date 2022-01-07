const mongoose = require("mongoose");

module.exports = () => {
    mongoose
        .connect("mongodb://root:root@127.0.0.1:27017/jianshu?authSource=admin", {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        .then(() => {
            console.log("数据库连接成功");
        })
        .catch((err) => {
            console.error("数据库连接失败", err);
        });
};
