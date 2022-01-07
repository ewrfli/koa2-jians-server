const router = require('koa-router')()
const models = require('../models')
router.prefix('/users')


router.post('/add', async function (ctx) {
  
  let { username='', pwd='' } = ctx.request.body
  await models.User.create({username, pwd}).then(rel=>{
    if(rel){
      ctx.body = {
        code: 200,
        msg: '添加成功',
        data: rel
      }
    }else{
      ctx.body = {
        code: 300,
        msg: '添加失败'
      }
    }
  }).catch(err=>{
    ctx.body = {
      code: 400,
      msg: '添加异常'
    }
    console.error(err)
  })

})

router.delete('/del', async function (ctx, next) {
  let {_id} = ctx.request.body
  await models.User.findOneAndDelete({_id}).then(rel=>{
    if(rel){
      ctx.body = {
        code: 200,
        msg: '删除成功',
        reslut: rel//返回删除对象
      }
    }else{
      ctx.body = {
        code: 300,
        msg: '删除失败'
      }
    }
  }).catch(err=>{
    ctx.body = {
      code: 400,
      msg: '删除异常'
    }
    console.error(err)
  })
})

router.put('/update', async function (ctx, next) {
  let params = ctx.request.body
  await models.User.updateOne(
    {_id: params._id},
    {
      username: params.username, 
      pwd: params.pwd
    }
    
    ).then(rel=>{
    if(rel){
      ctx.body = {
        code: 200,
        msg: '修改成功',
        reslut: rel
      }
    }else{
      ctx.body = {
        code: 300,
        msg: '修改失败',
        data: rel
      }
    }
  }).catch(err=>{
    ctx.body = {
      code: 400,
      msg: '修改异常'
    }
    console.error(err)
  })

})


router.get('/find', async function (ctx, next) {
  await models.User.find().then(rel=>{
    if(rel){
      ctx.body = {
        code: 200,
        msg: '成功',
        reslut: rel//返回删除对象
      }
    }else{
      ctx.body = {
        code: 300,
        msg: '失败'
      }
    }
  }).catch(err=>{
    ctx.body = {
      code: 400,
      msg: '异常'
    }
    console.error(err)
  })
})

router.get('/find/:id', async function (ctx, next) {
  await models.User.findOne({_id: ctx.params.id}).then(rel=>{
    if(rel){
      ctx.body = {
        code: 200,
        msg: '成功',
        reslut: rel//返回删除对象
      }
    }else{
      ctx.body = {
        code: 300,
        msg: '失败'
      }
    }
  }).catch(err=>{
    ctx.body = {
      code: 400,
      msg: '异常'
    }
    console.error(err)
  })
})


module.exports = router
