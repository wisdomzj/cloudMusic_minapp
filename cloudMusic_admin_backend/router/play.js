const Router = require('koa-router')
const router = new Router({prefix: '/play'})
const { findAll, getById, edit, remove } = require('../controller/play')

router.get('/findAll', findAll)
router.get('/getById', getById)
router.post('/edit', edit)
router.get('/remove', remove)

module.exports = router
