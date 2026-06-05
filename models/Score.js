const mongoose = require('mongoose');
//const Connection = require('./Connection');
const Connection = require('./Connection'); 
const db = new Connection(); // This works if exported as class

//const conn = new //Connection().getConnection();



const scoreSchema = new mongoose.Schema({
	student_name:String,
	subject:String,
	score:Number,
	type:String,
	totalQuestions:Number,
	percentage: String
});

const Score = db.model('Score',scoreSchema);

module.exports = Score;