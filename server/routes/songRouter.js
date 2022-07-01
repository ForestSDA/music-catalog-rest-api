const Router = require('express')
const router = new Router()
const songController = require('../controllers/songController')

router.post('', songController.create)
router.get('', songController.get)
router.delete('', songController.delete)
router.patch('',songController.update)

module.exports = router