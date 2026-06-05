// Score.js
const mongoose = require('mongoose');
const db = require('./Connection'); // This is already the instance!

const scoreSchema = new mongoose.Schema({
	student_name: String,
	subject: String,
	score: Number,
	type: String,
	totalQuestions: Number,
	percentage: String
});

const Score = db.model('Score', scoreSchema);

module.exports = Score;
