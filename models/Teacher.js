

// db.js
const mongoose = require('mongoose');

// Load .env only in development
if (process.env.MODE_ENV !== 'production') {
  require('dotenv').config();
}

// Choose the right URI
const uri = process.env.MODE_ENV === 'production'
  ? process.env.MONGO_URI
  : process.env.MONGO_URI_LOCAL;

if (!uri) throw new Error("MongoDB URI is not defined");

// Connect once globally
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log("✅ Connected to MongoDB");
});
mongoose.connection.on('error', err => {
  console.error("❌ MongoDB connection error:", err);
});

const teacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  qualification: String,
  phone: String,
  password: String
});

module.exports = mongoose.model('Teacher', teacherSchema);