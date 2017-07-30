const ObjectID = require('mongodb').ObjectID
const jwt = require('jsonwebtoken')


const Todo = require('./../../models/todo.js').Todo
const User = require('./../../models/user.js').User


const userOneId = new ObjectID()
const userTwoId = new ObjectID()

const users = [{
    _id: userOneId,
    email: 'example12345@example.com',
    password: 'example12345',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}, {
    _id: userTwoId,
    email: 'example123456@example.com',
    password: 'example123456',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}]



var dummyTodos = [
    {_id: new ObjectID(), text: 'first chore', _user: userOneId},
    {_id: new ObjectID(), text: 'second chore', completed: true, completedAt: 333, _user: userTwoId}
    ]

var populateTodos = function(done){
    Todo.remove({}).then(function(){
        return Todo.insertMany(dummyTodos);
    }).then(function(){
        done()
    })
}

var populateUsers = function(done){
    User.remove({}).then(function(){
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();
        
        return Promise.all([userOne, userTwo])
    }).then(function(){
        done()
    })
}

module.exports.dummyTodos = dummyTodos;
module.exports.populateTodos = populateTodos;
module.exports.users = users;
module.exports.populateUsers = populateUsers;