const express = require('express');
const router = express.Router();
const mongojs = require('mongojs') ;
//var multer = require("multer");
//var fs = require("fs");
const productDetail = require('../model/product.js');


router.post('/saveProduct', function(req, res){
    var data = {
        productName : req.body.data.productName,
        productCountry : req.body.data.productCountry
       // userpic:filename
    }
var newProduct = new productDetail(data);
newProduct.save(function(err, result){
if(err){
 res.status(500).send({message:err.message});
}
else{
    res.json(result);
}
});
});
router.get('/list', function(req, res){
    productDetail.find({},function(err, docs){
        if(err){res.status(500).send({message:err.message});}
        else{res.json(docs)};
    })
})

router.put('/updateProduct', function(req, res){
    var query = {"_id" : mongojs.ObjectId(req.body.data._id)}
console.log(query);
    var update = {
       
        productName:req.body.data.productName,
        productCountry:req.body.data.productCountry
    }
    productDetail.findOneAndUpdate(query, update, function(err, docs){
        if(err){res.status(500).send({message:err.message});}
        else{
            res.json(docs);  
        }
        console.log(query);
    })
})
router.delete('/delete/:id', function(req, res){
    productDetail.findByIdAndRemove(req.params.id, function(err, docs){
        if(err){res.status(500).send({message:err.message});}
        else{
            res.json(docs);
         //   console.log(docs);
        }  
    })
})

module.exports = router;