// Score.js
const mongoose = require('mongoose');
const Connection = require('./Connection');

// Instantiate the class
const db = new Connection(); 

const scoreSchema = new mongoose.Schema({
	student_name: String,
	subject: String,
	score: Number,
	type: String,
	totalQuestions: Number,
	percentage: String
});

// Now you can call .model() directly on your 'db' instance
const Score = db.model('Score', scoreSchema);

module.exports = Score;
