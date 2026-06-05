// Example: Admin.js
const mongoose = require('mongoose');

// Load .env only in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Ensure you have a unique URI for this model, or use the global one
const uri = process.env.NODE_ENV === 'production'
  ? process.env.MONGO_URI
  : process.env.MONGO_URI_LOCAL;

if (!uri) throw new Error("MongoDB URI is not defined");

// Create a unique connection for this model
const adminConn = mongoose.createConnection(uri);

studentConn.on('connected', () => console.log("✅ Admin Model: Connected to MongoDB"));
studentConn.on('error', err => console.error("❌ Student Model: Connection error:", err));

// Define Schema
const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Register model to the specific connection
module.exports = adminConn.model('Admin', AdminSchema);
