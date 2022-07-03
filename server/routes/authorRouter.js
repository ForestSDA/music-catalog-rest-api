const Router = require('express')
const router = new Router()
const authorController = require('../controllers/authorController')

router.post('', authorController.create)
router.get('', authorController.read)
router.patch('', authorController.update)
router.delete('', authorController.delete)

module.exports = router