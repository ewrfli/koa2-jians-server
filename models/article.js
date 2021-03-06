let mongoose = require('mongoose')
const articleSchecma = new mongoose.Schema({
    id: Number,
    title: String,
    createTime: String,
    content: String,
    desc: String,
    stemfrom: String,
    coverImg: {
        type: String,
        default: ''
    },
    read: {
        type:Number,
        default: 0
    },
    star: {
        type:Number,
        default: 0
    },
    comment: {
        type:Number,
        default: 0
    },
    author: String
})

const Articles = mongoose.model('articles', articleSchecma)

module.exports = {
    Articles
}