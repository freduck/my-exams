// const mongoose = require('mongoose');

const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/local',{}).then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));



    productSchema = new mongoose.Schema({
      name: String,
      price: Number,
      description: String,
      image: String // URL or path to image
    });
  


const Product = mongoose.model('Product', productSchema);
module.exports = Product;