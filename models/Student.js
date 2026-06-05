// Student.js
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
const studentConn = mongoose.createConnection(uri);

studentConn.on('connected', () => console.log("✅ Student Model: Connected to MongoDB"));
studentConn.on('error', err => console.error("❌ Student Model: Connection error:", err));

// Define Schema
const studentSchema = new mongoose.Schema({
  name: String,
  address: String,
  class: String,
  username: String,
  email: String,
  tel: String,
  password: String,
  image: String
});

// Compile the model onto the specific connection
const Student = studentConn.model('Student', studentSchema);

module.exports = Student;
