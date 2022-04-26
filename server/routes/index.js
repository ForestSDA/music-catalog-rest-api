const Router = require('express')
const router = new Router()
const authorRouter = require('./authorRouter')
const songRouter = require('./songRouter')


router.use('/author', authorRouter)
router.use('/song', songRouter)



module.exports = router