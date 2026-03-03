const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require ('cors');
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// const express = require('express');
app.use(cors());
const homeControll =  require('./controllers/HomeController');
const ExamController = require('./controllers/ExamController');
const Home =  new homeControll(app,path);
const exams =  new ExamController(app,path);
exams.startExam();
Home.AppListening ();
const port = 3000;
exams.addQuestion();
exams.saveQuestion();
exams.showExam();
exams.SubmitExam();
exams.addScore();
app.get('/t',function(req,resp){
	// resp.send('hi');
	console.log('hello');
})
app.listen(port,function(){
console.log('application is running on port',port);
});