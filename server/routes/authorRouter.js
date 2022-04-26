const Router = require('express')
const router = new Router()
const authorController = require('../controllers/authorController')

router.post('/create', authorController.create)
router.get('/get', authorController.get)
router.delete('/delete', authorController.delete)
router.patch('/update', authorController.update)


module.exports = router
