const express = require ('express');
const jwt = require('jsonwebtoken')
// initialize our express app
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//var path = require ("path");
app.use (bodyParser.json());
app.use (bodyParser.urlencoded({extended:false}));
app.use (function(req, res, next){

    res.header('Access-Control-Allow-Origin','*'),
    res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE'),
    res.header('Access-Control-Allow-Headers','Content-Type'),
    res.header('Access-Control-Allow-Credentials',true),

next();
});
//app.use(express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb://localhost/productDetailDB'); // db name
var productAPI = require ('./server/route/product-api.js');
var registerAPI = require ('./server/route/register-api.js');

app.use('/product', productAPI);
app.use('/register', registerAPI);

app.get('/' , function(req, res){
    res.send('Hello Mongo');
});



app.get('/list', function(req, res){
    res.send({message:'Hello Node Sanjay'});
});

app.post('/api/post', verifyToken, (req, res) => {
    res.json({message:'Welcome to the post API ...'});
});

app.post('/api/login', (req, res) =>{

    const user = {
        id : 1,
        user: 'sanjay',
        email:'c2sanjay@gmail.com'
    }
    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token
        });

    });

});
//Format of Token
//Authorization:Bearer >access_token>
//verify Token
function verifyToken(req,res,next){
    //get auth header value
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader != 'undefined'){
        //split at the space
   const bearer = bearerHeader.split('');
   //Get token from array
   const bearerHeader = bearer[1];
   //Set the token
   req.token = bearerHeader;
   //Next middleware
   next();
    }else{
        res.sendStatus(403);
    }
}


app.listen(3000);
console.log('http://localhost:3000');