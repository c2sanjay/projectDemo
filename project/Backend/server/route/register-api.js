var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var register = require('../model/register.js');
var auth = require('../auth/auth');

router.post('/saveRegister1', function (req, res) {

    var data = {
        Name: req.body.data.Name,
        Username: req.body.data.Username,
        Password: req.body.data.Password
    }
    console.log(data)
    var newRegister = new register(data);
    newRegister.save(function (err, result) {
        if (err) {
            console.log(data);
            res.status(500).send({ message: err.message })
        }
        else {
            console.log(result);
            res.send({ message: 'success' })
        }
    })
})
router.get('/list', function (req, res) {
    register.find({}, function (err, doc) {
        if (err) { res.status(500).send({ message: err.message }); }
        else { res.json(doc); }
    })
})

router.post('/signin', function (req, res) {
    register.findOne({ Username: req.body.Username }, '+Password', function (err, user) {
        if (!user) {
            
            return res.send({ success: false, message: 'Username is Incorrect' });
        }
        else {
            user.comparePassword(req.body.Password, function (err, isMatch) {
                if (!isMatch) {
                   // console.log("Wrong user");
                    return res.send({ success: false, message: 'Password Incorrect' });
                }
                res.json({ success: true, token: auth.createJWT(user), Username: user.Username });
            })
        }
    })
})

router.post('/saveRegister', function (req, res) {
    register.findOne({ Username: req.body.Username }, function (err, existingUser) {
        console.log(existingUser);
        if (existingUser) { return res.send({ success: false, message: 'user already exist' }); }
        else {
           // console.log('else');
            console.log(req.body);
            
            var user = new register({
                Username: req.body.Username,
                Password: req.body.Password
                //Name: req.body.data.Name
            });
            console.log(user);
            user.save(function (err1, doc) {
                //console.log('err1');
                console.log(err1);
                if (err1) {
                    res.json({ success: false, message: err1.message });
                }else{
                res.json({ success: true, message: 'data saved' });
                }
            });
        }
    });

});


module.exports = router;