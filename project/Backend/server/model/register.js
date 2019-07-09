var mongoose = require ('mongoose');
var bcrypt = require ('bcryptjs');
var schema = mongoose.Schema;

var register = new schema({

    created: { type: Date },
    updated: { type: Date },
    Username:{type: String, unique:true},
    Password:{type: String, select:false}
},
{versionKey:false});

register.pre('save', function(next){
  var  now = new Date();
    this.update = now;
    if(!this.created){
        this.created = now;
    }
    var user = this;
    if(!user.isModified('Password')){
        return next()
    }
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(user.Password,salt, function(err1,hash){
            user.Password = hash;
            next();
        });
    });
});

register.methods.comparePassword = function(Password, done){
    bcrypt.compare(Password, this.Password, function(err, isMatch){
        done(err,isMatch);
    })
}
var register = mongoose.model('register', register);

module.exports = register;