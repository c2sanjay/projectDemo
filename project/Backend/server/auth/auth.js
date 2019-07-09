var jwt = require('jwt-simple');
var moment = require ('moment');
var config = require('./config');


module.exports = {

    ensureAuthenticated:function(req, res, next){
        if(!req.headers.authorization){
            return res.status(401).send({message: "Please make sure your request has been Authorized."});
        }
var token = req.headers.authorization.split('')[1];
var payload = null;

try{
    payload = jwt.decode(token, config.TOKEN_SECRET);
}
catch(err){
    return req.status(401).send({message:err.message})
}

if(payload.exp <= moment().unix()) {
    return res.status(401).send({message:"Token has expired"});
}
req.user = payload.sub
next();
    },

  createJWT:function(user){
    var payload={
        sub:user._id,    //subject
        iat:moment().unix(),  // current time on local or server, inialize time
        exp:moment().add(14,'days').unix()  //expired time
    };
    return jwt.encode(payload,config.TOKEN_SECRET);

    }
    
}