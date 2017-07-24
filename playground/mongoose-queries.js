var ObjectID = require('mongodb').ObjectID

var mongoose = require('./../server/db/mongoose.js').mongoose
var Todo = require('./../server/models/todo.js').Todo
var User = require('./../server/models/user.js').User

/*var id = '5970df834d16ba120ca48be8'

if (!ObjectID.isValid(id)){
    console.log('ID not valid')
} 

// finding all documents where a property equals a set value

Todo.find({
    _id: id
}).then(function(docs){
    console.log('Todos: '+docs)
});

// finding the first document where a property equals a set value

Todo.findOne({
    _id: id
}).then(function(doc){
    console.log('Todo: '+doc)
});

// finding all documents where ID matches a given value

Todo.findById(id).then(function(doc){
    
    if (!doc){
        return console.log('Todo by ID: Id not found')
    }
    
    console.log('Todo by Id: '+doc)
}).catch(function(e){
    console.log(e)
});*/


var userID = '596dd4723168480a479a19c7'

User.findById(userID).then(function(doc){
    if (!doc) {
        return console.log('User: no user found')
    } else {
        console.log('User: '+doc)
    }
}).catch(function(e){
    console.log(e)
});


