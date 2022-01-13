let mongoose = require('mongoose')
//文章评论文档对象
const commentSchecma = new mongoose.Schema({
    id: Number,
    username: String,
    articleAuthor: String,
    articleTitle: String,
    articleId: Number,
    commentContent: String,
    commentCreateTime: String,
})

const Comments = mongoose.model('comments', commentSchecma)

module.exports = {
    Comments
}