const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID




MongoClient.connect('mongodb://localhost:27017/TodoApp', function(err, db){
    if (err){
        console.log('Unable to connect to MongoDB Server')
    } else {
        console.log('Connected to MongoDB server')
    }
    
    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, function(err, result){
        if (err){
            console.log('Unable to insert todo because: '+err)
        } else {
            console.log(JSON.stringify(result.ops, undefined, 2))
        }
    })
    
    db.collection('Users').insertOne({
        name: 'Avi Tillu',
        age: 27,
        location: 'London'
    }, function(err, result){
        if (err){
            console.log('Unable to insert data because: '+err)
        } else {
            console.log(JSON.stringify(result.ops[0]._id.getTimestamp()))
        }
    })
    
    
    
    db.close(); 
})