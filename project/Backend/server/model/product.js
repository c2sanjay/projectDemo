const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productDetail = new schema({
    // _id:String,
    productName:String,
    productCountry:String
   // userpic:String
});

// Export the model
module.exports = mongoose.model('productTB', productDetail);
//productTB IS THE TABLE NAME