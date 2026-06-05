const mongoose = require('mongoose');
const Connection = require('./Connection');

const conn = new Connection().getConnection();



const scoreSchema = new mongoose.Schema({
	student_name:String,
	subject:String,
	score:Number,
	type:[],
	totalQuestions:Number,
	percentage: String
});

const Score = conn.model('Score',scoreSchema);

module.exports = Score;