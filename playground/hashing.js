const SHA256 = require('crypto-js').SHA256
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

var password = '123abc'

/*bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(password, salt, function(err, hash){
        console.log(hash)
    })
})*/

var hashedPassword = '$2a$10$EAGWGJr3lu9Lx/q7QlIfBOVhn3I/enuQt0eO/mErlbgkdgBEWC3v2'

if (bcrypt.compare(password, hashedPassword)){
    console.log('true')
} else {
    console.log('false')
}
    


/*var data = {
    id: 10
}

var token = jwt.sign(data, '123abc')
console.log(token);

var decoded = jwt.verify(token, '123abc')
console.log(decoded);


var message = 'I am user number 3'
var hash = SHA256(message).toString();


var data = {
    id: 4
};

var token = {
    data: data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}


token.data.id = 5
token.hash = SHA256(JSON.stringify(token.data)).toString()

var resultHash = SHA256(JSON.stringify(token.data)+'somesecret').toString()

if (resultHash === token.hash){
    console.log('Data was not change. Is genuine')
} else {
    console.log('Data may be changed.')
}*/