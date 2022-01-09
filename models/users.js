const mongoose = require('mongoose')
//系统用户模型对象
const usersSchecma = new mongoose.Schema({
    username: String,
    pwd: {
        type: String,
        select: false
    },
    id: {
        type: String,
        default: '001'
    },
    power: {
        type: String,
        default: '0'
    },
    avatar: {
        type: String,
        default: ''
    },
    sex: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    }

})

const Users = mongoose.model('users', usersSchecma)

module.exports = {
    Users
}