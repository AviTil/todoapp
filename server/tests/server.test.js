var expect = require('expect');
var request = require('supertest');
var ObjectID = require('mongodb').ObjectID;

const app = require('./../server.js').app
const Todo = require('./../models/todo.js').Todo


var dummyTodos = [
    {_id: new ObjectID(), text: 'first chore'},
    {_id: new ObjectID(), text: 'second chore'}
    ]

beforeEach(function(done){
    Todo.remove({}).then(function(){
        return Todo.insertMany(dummyTodos);
    }).then(function(){
        done()
    })
})

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