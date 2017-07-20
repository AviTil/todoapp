var expect = require('expect');
var request = require('supertest');

const app = require('./../server.js').app
const Todo = require('./../models/todo.js').Todo


var dummyTodos = [
    {text: 'first chore'},
    {text: 'second chore'}
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