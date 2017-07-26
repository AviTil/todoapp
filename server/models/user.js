var mongoose = require('mongoose');
var validator = require('validator');
const jwt = require('jsonwebtoken')
const _ = require('lodash');
const bcrypt = require('bcryptjs')


var UserSchema = new mongoose.Schema({
    email: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            unique: true,
            validate: {
                validator: function(value){
                    return validator.isEmail(value)
                },
                message: 'That is not a valid email'
            }
    }, 
    
    password: {
            type: String,
            required: true,
            minlength: 6,
    },
    
    tokens: [{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
    }]
    
})

UserSchema.methods.toJSON = function(){
    var user = this
    var userObject = user.toObject()
    
    return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function(){
    
    // code that creates token property of tokens
    
    var user = this;
    var access = 'auth';
    var token = jwt.sign({
        _id: user._id.toHexString(), 
        access: access
        }, 
        'abc123').toString()
    
    // code that adds tokens to a user object
    
    user.tokens.push({access: access, token: token})
    
    return user.save().then(function(){
        return token
    })
    
}

UserSchema.statics.findByToken = function(token){
    var User = this
    var decoded;
    
    try {
        decoded = jwt.verify(token, 'abc123')
    } catch(e){
        return Promise.reject()
    }
    
    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}

UserSchema.pre('save', function(next){
    var user = this;
    if (user.isModified('password')){
        
        var newPassword = user.password
        
        bcrypt.genSalt(10, function(err, salt){
            
            bcrypt.hash(newPassword, salt, function(err, hash){
                
                user.password = hash
                next()
            })
        })
        
    } else {
        
    }
    
})


var User = mongoose.model('User', UserSchema);

module.exports = {
    User: User
}