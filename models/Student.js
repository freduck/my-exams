const mongoose = require('mongoose');

// Load .env only in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Choose the right URI
const uri = process.env.NODE_ENV === 'production'
  ? process.env.MONGO_URI
  : process.env.MONGO_URI_LOCAL;

if (!uri) throw new Error("MongoDB URI is not defined");

// Connect once globally
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define schema + model
const studentSchema = new mongoose.Schema({
  name: String,
  address: String,
  class: String,
  username: String,
  email: String,
  tel: String,
  password: String,
  image: String
}, { timestamps: true }); // optional: adds createdAt, updatedAt

const Student = mongoose.model('Student', studentSchema);

// Export the model
module.exports = Student;