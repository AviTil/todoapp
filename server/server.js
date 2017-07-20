var express = require('express');
var bodyParser = require('body-parser')

var mongoose = require('./db/mongoose').mongoose
var Todo = require('./models/todo').Todo
var User = require('./models/user').User

var app = express();

app.use(bodyParser.json());

app.post('/todos', function(req, res){
    var todo = new Todo({
        text: req.body.text
    });
    
    todo.save().then(function(doc){
        res.send(doc)    
    }, function(error){
        res.status(400).send(error)
    })
      
});


app.get('/todos', function(req, res){
  Todo.find().then(function(docs){
      res.send({docs})
  }, function(error){
      res.send(error)
  });  
});



app.listen(3000, function(){
    console.log('App running on port 3000')
})

module.exports.app = app