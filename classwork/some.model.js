var mongoose = require('mongoose')
const ArticleSchema = new mongoose.Schema({
 title: { type: String, required: true },
 
})
var Ticle = mongoose.model('Article', ArticleSchema)
module.exports = Ticle