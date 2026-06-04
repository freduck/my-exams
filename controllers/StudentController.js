const Student = require('.././models/Student');
const multer = require('multer');
const path = require('path');
const express = require('express');
const bcrypt = require('bcrypt');

class StudentController {
  constructor(app, basePath) {
    this.app = app;
    this.basePath = basePath;
    this.basePath=__dirname;

    // Serve uploaded files statically
    const uploadPath = path.join(process.cwd(), 'uploads');
    this.app.use('/uploads', express.static(uploadPath));

    // Multer storage config
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this folder exists
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
      }
    });

    this.upload = multer({ storage });
  }

  getStudents() {
    this.app.get('/getstudents', async (req, resp) => {
      const students = await Student.find({});
      resp.json(students);
    });
  }

  addStudent() {
    this.app.get('/add-student', (req, resp) => {
      this.basePath=__dirname
      resp.sendFile(path.join(this.basePath, '.././views/admin/add-student.html'));
    });
  }

  uploadStudent() {
    this.app.post('/add-student', this.upload.single('image'), async (req, resp) => {
      try {
        const data = {
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          address: req.body.address,
          tel: req.body.tel,
          class: req.body.class,
          password: req.body.password ? await bcrypt.hash(req.body.password, 10) : null,
          image: req.file ? `/uploads/${req.file.filename}` : null
        };

        await Student.create(data);
        resp.sendFile(path.join(__dirname, '.././views/admin/add-student-success.html'));
      } catch (err) {
        resp.status(500).json({ error: err.message });
      }
    });
  }

  editStudent() {
    this.app.post('/edit', async (req, resp) => {
      const id = req.body.id;
      const student = await Student.findById(id);
      resp.json({ Student: student });
    });
  }

  updateStudent() {
    this.app.post('/update-student', this.upload.single('image'), async (req, res) => {
      try {
        const studentId = req.body['student-id']; // hidden input from form
        const { name, address, class: userClass, username, email, tel, password } = req.body;

        let updateData = { name, address, class: userClass, username, email, tel };

        if (req.file) {
          updateData.image = `/uploads/${req.file.filename}`;
        }

        if (password) {
          updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await Student.findByIdAndUpdate(
          studentId,
          { $set: updateData },
          { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });
  }

  deleteStudent() {
    this.app.post('/delete-student', async (req, resp) => {
      const id = req.body.id;
      const deletedStudent = await Student.findByIdAndDelete(id);
      if (deletedStudent) {
        resp.json({ message: 'Student Deleted' });
      } else {
        resp.status(404).json({ message: 'Student not found' });
      }
    });
  }

  loginStudent() {
    this.app.get('/login-student', (req, resp) => {
      resp.sendFile(path.join(this.basePath, '.././views/login-student.html'));
    });
  }

  studentLogin() {
      
    this.app.post('/login-student', async (req, response) => {
      const { username, password } = req.body;
      console.log(req.body)
      const student = await Student.findOne({ username});
     
      if (student) {
        console.log(student)
        response.json({ message: 'Login Successful', Student: student });
      } else {
        response.json({ message: 'Student not found' });
      }
    });
  }

  studentProfile() {
    this.app.get('/student-profile', (req, response) => {
      response.sendFile(path.join(this.basePath, '.././views/students/profile.html'));
    });
  }

  studentScore(){
    this.app.get('/score', async(req,resp)=>{
resp.sendFile(__dirname,'.././views/students/result.html')
    });
  }
getScore(){

this.app.post('/score', async (req, res) => {

  const name = req.body.name;

  const result = await Score.aggregate([
    { 
      // 1. Get all test/exam scores for the specific student
      $match: { 
        student_name: name,
        type: { $in: ['test', 'exam'] } 
      } 
    },
    { 
      // 2. Group all documents to find one total average
      $group: {
        _id: "$student_name",
        overallAverage: { $avg: "$score" }
      }
    },
    {
      // 3. Apply grading logic to the final average
      $project: {
        overallAverage: 1,
        finalGrade: {
          $switch: {
            branches: [
              { case: { $gte: ["$overallAverage", 90] }, then: "A" },
              { case: { $gte: ["$averageScore", 80] }, then: "B" },
              { case: { $gte: ["$averageScore", 70] }, then: "C" },
              { case: { $gte: ["$averageScore", 60] }, then: "D" }
            ],
            default: "F"
          }
        }
      }
    }
  ]);

  res.json(result);
});

 
 


}
}

module.exports = StudentController;
