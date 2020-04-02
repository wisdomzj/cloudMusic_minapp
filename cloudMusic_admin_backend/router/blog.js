const Router = require('koa-router')
const router = new Router({prefix: '/blog'})
const { findAll, remove } = require('../controller/blog')

router.get('/findAll', findAll)
router.post('/remove', remove)

module.exports = router
