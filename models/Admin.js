// Example: Admin.js
const mongoose = require('mongoose');
require('dotenv').config();

// Create a dedicated connection for this model
const adminConn = mongoose.createConnection(process.env.MONGO_URI);

// Define Schema
const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Register model to the specific connection
module.exports = adminConn.model('Admin', AdminSchema);
