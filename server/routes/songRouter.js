const Router = require('express')
const router = new Router()
const songController = require('../controllers/songController')

router.post('', songController.create)
router.get('', songController.read)
router.patch('',songController.update)
router.delete('/:id', songController.delete)

module.exports = router