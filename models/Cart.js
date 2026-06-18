
const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/local',{}).then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

const cartSchema = new mongoose.Schema({
  userId: String,
  products: [String] // productIds
});