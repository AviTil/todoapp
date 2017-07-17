const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID




MongoClient.connect('mongodb://localhost:27017/TodoApp', function(err, db){
    if (err){
        console.log('Unable to connect to MongoDB Server')
    } else {
        console.log('Connected to MongoDB server')
    }
    
    
    /*db.collection('Todos').findOneAndUpdate({
        text: 'eat lunch'
    }, {
        $set: {completed: false}
    }, {
        returnOriginal: false
    }).then(function(result){
        console.log(result)
    });*/
    
    
    db.collection('Users').findOneAndUpdate({
        name: 'Atharv Tillu'
    }, {
        $set: {name: 'Atharv Tillu'},
        $inc: {age: -26}
    }, {
        returnOriginal: false
    }).then(function(result){
        console.log(result);
    })
    
    //db.close();
    
})