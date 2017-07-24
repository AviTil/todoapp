const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser')
var ObjectID = require('mongodb').ObjectID

var mongoose = require('./db/mongoose').mongoose
var Todo = require('./models/todo').Todo
var User = require('./models/user').User

var app = express();
const port = process.env.PORT || 3000


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
      res.send({docs: docs})
  }, function(error){
      res.send(error)
  });  
});



app.get('/todos/:id', function(req, res){
    var id = req.params.id
        
    if (!ObjectID.isValid(id)){
        
        res.status(404).send();
    
    } else {
        
        Todo.findById(id).then(function(doc){
            if (doc) {
                res.send(doc)
            } else {
                res.status(404).send()
            }
        }).catch(function(e){
            res.status(400).send()
        })
        
    }
  
})

app.delete('/todos/:id', function(req, res){
    var id = req.params.id
    
    if (!ObjectID.isValid(id)){
        return res.status(404).send()
    } 
    
    Todo.findByIdAndRemove(id).then(function(doc){
        if (doc){
            res.status(200).send(doc)
        } else {
            res.status(404).send()
        }
    }).catch(function(e){
        res.status(400).send()
    })
    
})

app.patch('/todos/:id', function(req, res){
    
    var id = req.params.id
    var body = _.pick(req.body, ['text', 'completed'])
    
    if (!ObjectID.isValid(id)){
        return res.status(404).send()
    }
    
    if (_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime()
    } else {
        body.completed = false
        body.completedAt = null
    }
    
    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then(function(doc){
        if(doc){
            res.send(doc)
        } else {
            res.status(404).send()
        }
    }).catch(function(e){
        res.status(400).send()
    })
    
})








app.listen(port, function(){
    console.log('App running on port '+port)
})

module.exports.app = app