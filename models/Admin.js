// Admin.js
const mongoose = require('./db'); // This points to the singleton

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Mongoose automatically uses the connection from the imported instance
module.exports = mongoose.model('Admin', AdminSchema);
