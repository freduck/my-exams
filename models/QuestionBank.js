const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/delambo',{}).then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

const questionBankSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., 'Maths'
  questions: [{
    question: { type: String, required: true },
    options: [String],
    correct: { type: String, required: true }
  }]
});

const QuestionBank = mongoose.model('QuestionBank', questionBankSchema);
module.exports = QuestionBank;