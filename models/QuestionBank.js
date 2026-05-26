const mongoose = require ('mongoose');
// mongoose.connect('mongodb+srv://school:school@cluster0.fl8is4a.mongodb.net/delambo',{}).then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('Error connecting to MongoDB:', err));
const conn = mongoose.createConnection('mongodb+srv://school:school@cluster0.fl8is4a.mongodb.net/delambo', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

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