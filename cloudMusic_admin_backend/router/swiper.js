const Router = require('koa-router')
const router = new Router({prefix: '/swiper'})
const { findAll, upload, remove } = require('../controller/swiper')

router.get('/findAll', findAll)
router.post('/upload', upload)
router.get('/remove', remove)

module.exports = router