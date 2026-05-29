const mongoose = require('mongoose');
const Connection = require('./Connection');

const conn = new Connection().getConnection();

const questionBankSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: String,
  questions: [{
    question: { type: String, required: true },
    options: [String],
    correct: { type: String, required: true }
  }]
});

const QuestionBank = conn.model('QuestionBank', questionBankSchema);
module.exports = QuestionBank;
