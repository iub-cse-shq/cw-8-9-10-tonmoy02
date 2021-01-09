var mongoose = require('mongoose')
const ArticleSchema = new mongoose.Schema({
 title: { type: String, required: true },
 content:  String
})
var Article = mongoose.model('Articles',ArticleSchema)
module.exports = Article