const mongoose = require('mongoose');

// 1. Fix typo: Change MODE_ENV to NODE_ENV
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// 2. Fix typo: Change MODE_ENV to NODE_ENV
const uri = process.env.NODE_ENV === 'production'
  ? process.env.MONGO_URI
  : process.env.MONGO_URI_LOCAL;

if (!uri) {
  throw new Error("❌ MongoDB URI is not defined. Check your .env file keys!");
}

// 3. Clean up: Removed deprecated connection options
mongoose.connect(uri);

mongoose.connection.on('connected', () => {
  console.log("✅ Connected to MongoDB");
});

mongoose.connection.on('error', err => {
  console.error("❌ MongoDB connection error:", err);
});

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
