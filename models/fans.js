let mongoose = require('mongoose')
//粉丝文档对象
const fansSchecma = new mongoose.Schema({
    username: String,
    author: String,
    createTime: String,
})

const Fans = mongoose.model('fans', fansSchecma)

module.exports = {
    Fans
}