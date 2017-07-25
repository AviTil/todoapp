const SHA256 = require('crypto-js').SHA256
const jwt = require('jsonwebtoken')

var data = {
    id: 10
}

var token = jwt.sign(data, '123abc')
console.log(token);

var decoded = jwt.verify(token, '123abc')
console.log(decoded);


/*var message = 'I am user number 3'
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