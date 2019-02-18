const express = require('express')
const router = express.Router()
const ArticleController = require('../controllers/ArticleController')
const isLogin = require('../middlewares/isLogin')
const isAuthor = require('../middlewares/isAuthor')
const images = require('../helpers/images')

router.post('/', isLogin, images.multer.single('image'), images.sendUploadToGCS, ArticleController.create)
router.get('/', isLogin, ArticleController.findAll)
router.get('/:id', isLogin, ArticleController.findOne)

router.put('/:id', isLogin, isAuthor, ArticleController.update)
router.delete('/:id', isLogin, isAuthor, ArticleController.delete)

module.exports = router
