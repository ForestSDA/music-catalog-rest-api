const Router = require('express')
const router = new Router()
const authorController = require('../controllers/authorController')

router.post('', authorController.create)
router.get('', authorController.get)
router.delete('', authorController.delete)
router.patch('', authorController.update)

module.exports = router