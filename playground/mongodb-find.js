const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID




MongoClient.connect('mongodb://localhost:27017/TodoApp', function(err, db){
    if (err){
        console.log('Unable to connect to MongoDB Server')
    } else {
        console.log('Connected to MongoDB server')
    }
    
/*db.collection('Todos').find({

    _id: new ObjectID('596cbad3e96e83b6a205b661')

}).toArray().then(function(docs){
    console.log('Todos');
    console.log(JSON.stringify(docs)); 
}, function(err){
    console.log('Unable to fetch todos')
});
    
db.collection('Todos').find().count().then(function(count){
    console.log('Todos count: '+count);
     
}, function(err){
    console.log('Unable to fetch todos')
})
    
db.collection('Users').find({name: 'Avi Tillu'}).toArray().then(function(docs){
    console.log(JSON.stringify(docs, undefined, 2))
},function(err){
    console.log('Unable to fetch users with name')
})*/
    
db.collection('Users').insertOne({
    name: 'Avi Tillu',
    age: 27
}).then(function(result){
    console.log(result)
});


//db.close();
    

})