var expect = require('expect');
var request = require('supertest');
var ObjectID = require('mongodb').ObjectID;

const app = require('./../server.js').app
const Todo = require('./../models/todo.js').Todo
const User = require('./../models/user.js').User
const dummyTodos = require('./seed/seed.js').dummyTodos
const populateTodos = require('./seed/seed.js').populateTodos
const users = require('./seed/seed.js').users
const populateUsers = require('./seed/seed.js').populateUsers

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', function(){
    
    it('should create a new todo', function(done){
        var text = 'pick up inlaws';
        
        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect(function(res){
            expect(res.body.text).toBe(text);
        })
        .end(function(err, res){
            if (err) {
                return done(err)
            }
            
            Todo.find({text: text}).then(function(todos){
                expect(todos.length).toBe(1)
                expect(todos[0].text).toBe(text);
                done();
            }).catch(function(err){
                done(err)
            })
            
        })
    })
  
    it('should not create a todo if send data invalid', function(done){
        
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end(function(failure, res){
            if (failure) {
                return done(failure)
            }
            
            Todo.find().then(function(docs){
                expect(docs.length).toBe(2)
                done()
            }).catch(function(failure){
                done(failure)
            })
        })
        
    })
    
})

describe('GET /todos', function(){
    it('should get all todos', function(done){
        request(app)
        .get('/todos')
        .expect(200)
        .expect(function(res){
            expect(res.body.docs.length).toBe(2)
        })
        .end(done)
    })
})

describe('GET /todos/:id', function(){
    
    it('should return the given todo', function(done){
        
        var id = dummyTodos[0]._id.toHexString();
        
        request(app)
        .get('/todos/'+id)
        .expect(200)
        .expect(function(res){
            expect(res.body.text).toBe(dummyTodos[0].text)
        })
        .end(done)
        
    })
    
    it('should return a 404 if todo not found', function(done){
        
        var emptyID = new ObjectID().toHexString()
        
        request(app)
        .get('/todos/'+emptyID)
        .expect(404)
        .end(done)
    })
    
    
    it('should return 404 if id invalid', function(done){
        request(app)
        .get('/todos/123')
        .expect(404)
        .end(done)
    })
    
})


describe('DELETE /todos/:id', function(){
    
    it('should remove a todo', function(done){
        
        var hexId = dummyTodos[0]._id.toHexString();
        
        request(app)
        .delete('/todos/'+hexId)
        .expect(200)
        .expect(function(res){
            expect(res.body._id).toBe(hexId)
        })
        .end(function(e, res){
            if (e){
                return done(e)
            }
            
            Todo.findById(hexId).then(function(doc){
                expect(doc).toNotExist()
                done()
            }).catch(function(e){
                done(e)
            })
            
        })
        
    })
    
    
    it('should return 404 if todo not found', function(done){ 
        
        var newID = new ObjectID().toHexString();
        
        request(app)
        .delete('/todos/'+newID)
        .expect(404)
        .end(done)
    })
    
    
    it('should return 404 if object id is invalid', function(done){
      
        request(app)
        .delete('/todos/12345')
        .expect(404)
        .end(done)
    })
   
})


describe('PATCH /todos/:id', function(){
    
    it('should update the todo', function(done){
        
        var id = dummyTodos[0]._id.toHexString()
        var text = "eat grapes"
        
        
        request(app)
        .patch('/todos/'+id)
        .send({
            completed: true,
            text: text
        })
        .expect(200)
        .expect(function(res){
            expect(res.body.text).toBe(text)
            expect(res.body.completed).toBe(true)
            expect(res.body.completedAt).toBeA('number')
        })
        .end(done)
        
    })
    
    
    it('should clear completedAt when todo is set to not complete', function(done){
      
        var id = dummyTodos[1]._id.toHexString()
        
        request(app)
        .patch('/todos/'+id)
        .send({
            completed: false
        })
        .expect(200)
        .expect(function(doc){
            expect(doc.body.completed).toBe(false)
            expect(doc.body.completedAt).toNotExist
        })
        .end(done)
    
    })
    
})

describe('GET /users/me', function(){
    
    it('should return user if authenticated', function(done){
        
        request(app)
        .get('/users/me')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect(function(user){
            expect(user.body._id).toBe(users[0]._id.toHexString())
            expect(user.body.email).toBe(users[0].email)
        })
        .end(done)
        
        
    })
    
    it('should return a 401 if user not authenticated', function(done){
        
        request(app)
        .get('/users/me')
        .expect(401)
        .expect(function(empty){
            expect(empty.body).toEqual({})
        })
        .end(done)
        
    })
    
    
})

describe('POST /users', function(){
    
    it('should create a user when valid data provided', function(done){
        var email = 'test123@example.com';
        var password= 'test123';
        
        request(app)
        .post('/users')
        .send({email, password})
        .expect(200)
        .expect(function(res){
            expect(res.headers['x-auth']).toExist()
            expect(res.body._id).toExist()
            expect(res.body.email).toBe(email)
        }).end(done)
        
    })
    
    
    it('should return validation errors if request invalid', function(done){
        var email = 'test.@example'
        var password = 'ghjhjhjhjhg'
        
        request(app)
        .post('/users')
        .send({email: email, password: password})
        .expect(400)
        .end(done)
    })
    
    it('should not create a user if email in use', function(done){
        var email = users[0].email;
        var password = 'example12345'
        
        
        request(app)
        .post('/users')
        .send({email: email, password})
        .expect(400)
        .end(done)
    
    })
    
})

describe('POST /users/login', function(){
    
    
    it('should login user and return auth token', function(done){
        
        request(app)
        .post('/users/login')
        .send({
            email: users[1].email,
            password: users[1].password
        })
        .expect(200)
        .expect(function(res){
            expect(res.headers['x-auth']).toExist()
            expect(res.body.email).toEqual(users[1].email)
        })
        .end(done)
        
    })
    
    
    it('should reject invalid login', function(done){
        
        request(app)
        .post('/users/login')
        .send({
            email: users[1].email,
            password: '1'+users[1].password
        })
        .expect(400)
        .expect(function(res){
            expect(res.headers['x-auth']).toNotExist()
            expect(res.body.email).toNotExist()
        })
        .end(function(err, res){
            if (err){
                return done(err)
            }
            
            User.findById(users[1]._id).then(function(user)
                {
                    expect(user.tokens.length).toBe(0)                                       
                })
            
            done()
        
        })
        
    })
    
    
})


describe('DELETE /users/me/token', function(){
    
    it('should remove auth token on logout', function(done){
        request(app)
        .delete('/users/me/token')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .end(function(err, res){
            if (err){
                return done(err)
            }
            
            User.findById(users[0]._id).then(function(user){
                expect(user.tokens.length).toBe(0)
            })
            done()
            
        })
        
        
    })
    
    
})