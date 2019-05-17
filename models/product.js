const mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
    name: String,
    url: String,
    img: String
});

let product = mongoose.model('product' , productSchema);

module.exports = product;