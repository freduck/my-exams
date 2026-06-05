const mongoose = require('mongoose');
require('dotenv').config();

// Create an isolated connection for this specific model
// Ensure MONGO_URI_QUESTION is defined in your .env
const questionConn = mongoose.createConnection(process.env.MONGO_URI);

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
