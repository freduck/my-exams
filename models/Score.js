// Score.js
const mongoose = require('mongoose');
require('dotenv').config();

// Create a unique connection instance for this model
const scoreConn = mongoose.createConnection(process.env.MONGO_URI);

const scoreSchema = new mongoose.Schema({
    student_name: String,
    subject: String,
    score: Number,
    type: String,
    totalQuestions: Number,
    percentage: String
});

// Register the model to THIS specific connection
module.exports = scoreConn.model('Score', scoreSchema);
