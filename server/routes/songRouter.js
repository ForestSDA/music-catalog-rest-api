const Router = require('express')
const router = new Router()
const songController = require('../controllers/songController')

router.post('', songController.create)
router.get('', songController.get)
router.patch('',songController.update)
router.delete('', songController.delete)

module.exports = router