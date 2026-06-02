require('dotenv').config();
const mongoose = require('mongoose');

// Establish the specific connection first
const conn = mongoose.createConnection(process.env.MONGO_URI);

const AdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String
});

// Now conn.model will work perfectly
const Admin = conn.model('Admin', AdminSchema);

module.exports = Admin;
