const mongoose = require('mongoose');
// Import the already-instantiated object
const db = require('./Connection'); 

const questionBankSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: String,
  questions: [{
    question: { type: String, required: true },
    options: [String],
    correct: { type: String, required: true }
  }]
});

// Use the .model method defined in your class
const QuestionBank = db.model('QuestionBank', questionBankSchema);
module.exports = QuestionBank;
