// Admin.js
const mongoose = require('mongoose');

// Load .env only in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const uri = process.env.NODE_ENV === 'production'
  ? process.env.MONGO_URI
  : process.env.MONGO_URI_LOCAL;

if (!uri) throw new Error("MongoDB URI is not defined");

// Create a unique connection for this model
const adminConn = mongoose.createConnection(uri);

// FIXED: Use the correct variable name 'adminConn' for listeners
adminConn.on('connected', () => console.log("✅ Admin Model: Connected to MongoDB"));
adminConn.on('error', err => console.error("❌ Admin Model: Connection error:", err));

// Define Schema
const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Register model to the specific connection
module.exports = adminConn.model('Admin', AdminSchema);
