const Router = require('express')
const router = new Router()
const songController = require('../controllers/songController')

router.post('/create', songController.create)
router.get('/get', songController.get)
router.delete('/delete', songController.delete)
router.patch('/update',songController.update)

module.exports = router

