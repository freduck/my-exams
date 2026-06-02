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
