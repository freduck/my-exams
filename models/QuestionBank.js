// QuestionBank.js
const mongoose = require('mongoose');

// Load .env only in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const uri = process.env.NODE_ENV === 'production'
  ? process.env.MONGO_URI
  : process.env.MONGO_URI_LOCAL;

if (!uri) throw new Error("MongoDB URI is not defined");

// Create an isolated connection for this specific model
const questionConn = mongoose.createConnection(uri);

// Add event listeners for consistent monitoring
questionConn.on('connected', () => console.log("✅ QuestionBank Model: Connected to MongoDB"));
questionConn.on('error', err => console.error("❌ QuestionBank Model: Connection error:", err));

const questionBankSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: String,
  questions: [{
    question: { type: String, required: true },
    options: [String],
    correct: { type: String, required: true }
  }]
});

// Register the model to the isolated connection
const QuestionBank = questionConn.model('QuestionBank', questionBankSchema);

module.exports = QuestionBank;
