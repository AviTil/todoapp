const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID




MongoClient.connect('mongodb://localhost:27017/TodoApp', function(err, db){
    if (err){
        console.log('Unable to connect to MongoDB Server')
    } else {
        console.log('Connected to MongoDB server')
    }
  
    
    //delete many
    
    /*db.collection('Todos').deleteMany({text: 'eat lunch'}).then(function(result){
        console.log(result);
    });
    
    //delete one
    
    db.collection('Todos').deleteOne({text: 'eat lunch'}).then(function(result){
        console.log(result)
    });
    
    //find one and delete
    
    db.collection('Todos').findOneAndDelete({completed: true}).then(function(result){
        console.log(result)
    });
    
    
    db.collection('Users').deleteMany({name: 'Avi Tillu'}).then(function(result){
        console.log(result);
    });
    
    
    db.collection('Users').findOneAndDelete({name: 'Chrishan Raja'}).then(function(result){
        console.log(result);
    })*/
    
    db.collection('Users').insertOne({
    name: 'Avi Tillu',
    age: 27,
    location: 'London'
    }).then(function(result){
    console.log(result)
    });
    
    
    //db.close()
    
})