require('dotenv').config();
const mongoose = require('mongoose');

// 1. Connect to MongoDB using the URI from your .env file
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// 2. Define the Schema
const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// 3. Fix: Use mongoose.model instead of conn.model
const Admin = mongoose.model('Admin', AdminSchema);

// 4. Export the model
module.exports = Admin;
