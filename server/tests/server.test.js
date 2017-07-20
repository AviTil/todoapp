var expect = require('expect');
var request = require('supertest');

const app = require('./../server.js').app
const Todo = require('./../models/todo.js').Todo


beforeEach(function(done){
    Todo.remove({}).then(function(){
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
            
            Todo.find().then(function(todos){
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
        .end(function(err, res){
            if (err) {
                return done(err)
            }
            
            Todo.find().then(function(todos){
                expect(todos.length).toBe(0)
                done()
            }).catch(function(err){
                done(err)
            })
        })
        
    })
    
}) 