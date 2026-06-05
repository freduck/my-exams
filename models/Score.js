// Score.js
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
const scoreConn = mongoose.createConnection(uri);

// Add event listeners for consistent monitoring
scoreConn.on('connected', () => console.log("✅ Score Model: Connected to MongoDB"));
scoreConn.on('error', err => console.error("❌ Score Model: Connection error:", err));

const scoreSchema = new mongoose.Schema({
    student_name: String,
    subject: String,
    score: Number,
    type: String,
    totalQuestions: Number,
    percentage: String
});

// Register the model to THIS specific connection
module.exports = scoreConn.model('Score', scoreSchema);
