var ObjectID = require('mongodb').ObjectID

var mongoose = require('./../server/db/mongoose.js').mongoose
var Todo = require('./../server/models/todo.js').Todo
var User = require('./../server/models/user.js').User

// remove all Todos (subject to a particular property value)

/*Todo.remove({}).then(function(docs){
    console.log(docs)
});*/

// remove the first Todo (out of all todos subject to a particular property value)

//Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.findByIdAndRemove('5976142efcf4786a1308a84c').then(function(doc){
    console.log(doc)
});