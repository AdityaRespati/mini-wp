const Article = require('../models/Article')

class ArticleController {

  static create(req, res) {
    var data = JSON.parse(req.body.data)
    console.log("TAGS", data.tags)
    var body = {
      title: data.title,
      description: data.description,
      content: data.content,
      tags: data.tags,
      author: req.user._id,
      image: req.file.cloudStoragePublicUrl
    }
  
    Article
      .create(body)
      .then(article => {
        console.log(article)
        res
          .json({
            msg: "create data success",
            data: article
          })
      })
      .catch(err => {
        console.log(err)
        res
          .status(400)
          .json({
            msg: "bad request",
            error: err
          })
      })
  }

  static findAll(req, res) {

    var query = {}

    if (req.query.q) {
      query = {
        $or: [{tags:{
          $regex: '.*' + req.query.q + '.*',
          $options: "i"
         }},{title: {
          $regex: '.*' + req.query.q + '.*',
          $options: "i"
        }}]
      }
    }

    Article
      .find(query).sort([
        ['createdAt', 'descending']
      ])
      .populate("author")
      .then(articles => {
        if (!articles.length) {
          res
            .status(404)
            .json({
              msg: "not found"
            })
        } else {
          res
            .status(200)
            .json({
              msg: "fetch data success",
              data: articles
            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .err({
            msg: "interall server error on find All",
            error: err
          })
      })
  }

  static findOne(req, res) {
    Article
      .findById(req.params.id)
      .populate("author")
      .then(article => {
        if (!article) {
          res
            .status(404)
            .json({
              msg: "not found"
            })
        } else {
          res
            .status(200)
            .json({
              msg: "fetch success",
              data: article
            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            msg: "internal server error on Find One",
            err
          })
      })
  }

  static findByAuthor(req, res) {
    Article
      .find({ author: req.user._id })
      .populate('author')
      .then(article => {
        if (!article) {
          res
            .status(404)
            .json({
              msg: "not found"
            })
        } else {
          res
            .status(200)
            .json({
              msg: "fetch success",
              data: article
            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            msg: "internal server error on controller",
            err
          })
      })
  }

  static update(req, res, next) {
    Article
      .findOneAndUpdate({ _id: req.params.id }, {
        title: req.body.title,
        content: req.body.content,
        description: req.body.description,
        tags: req.body.tags
      }, { new: true })
      .then(article => {
        if (!article) {
          res
            .status(404)
            .json({
              msg: "not found"
            })
        } else {
          res
            .status(200)
            .json({
              msg: "update success",
              data: article
            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            msg: "internal server error",
            error: err
          })
      })
  }

  static delete(req, res, next) {
    Article
      .findOneAndDelete({ _id: req.params.id })
      .then(article => {
        if (!article) {
          res
            .status(404)
            .json({
              msg: "not found"
            })
        } else {
          if (article.project) {
            return Project
              .findById(article.project)
              .then(project => {
                project.articles = project.articles.filter(e => e == article._id)
                return project.save()
              })
              .then(updatedProject => {
                res
                  .status(200)
                  .json({
                    msg: "delete success",
                    article,
                    updatedProject
                  })
              })
          } else {
            res
              .status(200)
              .json({
                msg: "delete success",
                article
              })
          }
        }
      })
      .catch(err => {
        res
          .status(404)
          .err({
            msg: "Not Found",
            error: err
          })
      })
  }

}

module.exports = ArticleController