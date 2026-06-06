const mongoose = require('mongoose');

// Don’t load dotenv here - do it once in server.js
const uri = process.env.NODE_ENV === 'production'
 ? process.env.MONGO_URI
  : process.env.MONGO_URI_LOCAL;

if (!uri) throw new Error("MongoDB URI is not defined");

// Isolated connection for QuestionBank
const questionConn = mongoose.createConnection(uri);

questionConn.on('connected', () => console.log("✅ QuestionBank: Connected to MongoDB"));
questionConn.on('error', err => console.error("❌ QuestionBank: Connection error:", err));

const questionBankSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: String,
  questions: [{
    question: { type: String, required: true },
    options: [String],
    correct: { type: String, required: true }
  }]
}, { timestamps: true });

const QuestionBank = questionConn.model('QuestionBank', questionBankSchema);

module.exports = QuestionBank;