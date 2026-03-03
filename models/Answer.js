
const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/local',{}).then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));
const answerSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  answers: [{
    questionId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'QuestionBank.questions' 
    },
    userAnswer: { type: String, required: true }
  }],
  submittedAt: { type: Date, default: Date.now }
});

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;