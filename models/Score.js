const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/delambo',{}).then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

const scoreSchema = mongoose.Schema({
	student_name:String,
	subject:String,
	score:Number,
	totalQuestions:Number,
	percentage: String
});

const Score = mongoose.model('Score',scoreSchema);

module.exports = Score;