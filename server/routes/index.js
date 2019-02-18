var express = require('express');
var router = express.Router();
const userRoute = require('../routes/users')
const articleRoute = require('../routes/articles')
const ArticleController = require('../controllers/ArticleController')
const isLogin = require('../middlewares/isLogin')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', userRoute)
router.use('/articles', articleRoute)
router.use('/user/articles', isLogin, ArticleController.findByAuthor)

module.exports = router;
