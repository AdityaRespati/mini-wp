
const mongoose = require('mongoose')

const ArticleShema = new mongoose.Schema({
  title : {
    type:String,
    required: [true, "title can't be empty"],
    maxlength: [20, "title can't be more than 20 characters"]
  },
  description: {
    type:String,
    required: [true, "description can't be empty"],
    maxlength: [20, "description can't be more than 20 characters"]
  },
  content : {
    type:String,
    required: [true, "content can't be empty"]
  },
  author : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: new Date
  },
  image: {
    type:String, 
    required: [true, "image can't be empty"]
  },
  tags: [String]
})

const Article = mongoose.model('Article', ArticleShema)

module.exports = Article