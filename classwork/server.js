var http = require('http')
var express = require('express')
var bodyParser = require('body-parser') 
var app = express() 
var server = http.Server(app) 
var Article = require('./article.model')  
//mongose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var dbURL = 'mongodb://localhost:27017/cse309'
mongoose.connect(dbURL, {useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.on('error', function (err)  {
    console.log(err)
 });
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true})) 




// your server routes go here
app.get('/', function(request, response){
    
    response.sendFile(__dirname + '/index.html');
})

app.get('/second', function(request, response){
    
    response.sendFile(__dirname + '/second.html');
})

app.get('/article/form', function(request, response){
    // console.log(request);
    response.sendFile(__dirname + '/form.html');
})

// var article = [
//     {    title :"1st title", content :"1st content" },
//     {    title :"2nd title", content :"2nd content" }];

app.post('/article/new', function (request, response) {
 
 var newArticle = new Article(request.body)
 newArticle.save(function (err, data) {
   if (err)
     return response.status(400).json({
       error: 'Title is missing-> '+data
     })
   return response.status(200).json({
     message: 'Article created successfully -> '+data
   })
 })
})

// app.post('/article/new', function(request, response){
//     //console.log("serv")
//     let newArticle = request.body;
//     if(newArticle.title){
//         article.push(request.body);
//         console.log(article);
//         response.json(article);
//     }
//     else{
//         response.status(400).json({
//             msg: "No title added"
//         })
//     }
// })

// app.get('/article/:id',function(request, response){
//     console.log(request.params.id);
//     response.render('article.ejs',{
//         article: article[request.params.id]
//     })
// })

app.get('/article/:id', function (request, response) {
    Article.findById(request.params.id, function (err, data) {
      response.render('article.ejs', {
        article: data
      })
    })
   })
   

// app.get('/articles/all',function(request, response){
//     response.render('allArticle.ejs',
//     {article: article}
//     )
// })

app.get('/articles/all', function (request, response) {
    console.log("test");
    Article.find({}, function (err, data) {
      response.render('allArticle.ejs', {
        articles: data
      })
    })
   })
   

server.listen(process.env.PORT || 3000,
process.env.IP || 'localhost', function(){
console.log('Server running');
})
module.exports = {app, server, mongoose}