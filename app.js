const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require ('cors');
const multer = require('multer');
// const path = require('path');
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.json());
// const express = require('express');
app.use(cors());
const homeControll =  require('./controllers/HomeController');
const ExamController = require('./controllers/ExamController');
const AdminCon = require('./controllers/AdminController');
const StudentController = require('./controllers/StudentController');
const Admin = new AdminCon(app,path); 
const Home =  new homeControll(app,path,3000);
const Exams =  new ExamController(app,path);
const Student = new StudentController(app,path);
 Student.getStudents();
Admin.getQuestions();
Student.updateStudent();
Student.deleteStudent();
Student.uploadStudent();
Student.editStudent();
Student.loginStudent();
Student.addStudent();
Student.studentLogin();
//Student.getScore();
Student.studentProfile();
//Student.studentScore();
Admin.deleteStudent();
Admin.loginAdmin();
Admin.AdminLogin();
Admin.addAdmin();
Admin.uploadAdmin();
Admin.validateAdmin();
Admin.verify();
Admin.adminAddScore();
Admin.dashboard();
Admin.getStudents();
Exams.startExam();
Home.AppListening ();
const port = 3000;
Exams.addQuestion();
Exams.saveQuestion();
Exams.showExam();
Exams.SubmitExam();
Exams.addScore();
Home.goHome();
app.get('/admin/',(req,resp)=>{
    resp.sendFile(path.join(__dirname,'./views/admin/login.html'))
})


app.get('/teacher/',(req,resp)=>{
    resp.sendFile(path.join(__dirname,'./views/teacher/login.html'))
})









// app.listen(port,function(){
// console.log('application is running on port',port);
// });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
