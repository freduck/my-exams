
const Student = require('.././models/Student');
const multer = require('multer');
const path = require('path');
const express = require('express')
class StudentController {
      constructor(app,path){
      	this.app = app;
      	this.path = path;
     
      }

      getStudents(){
      	this.app.get('/getstudents', async (req,resp)=>{
      	 	 const students = await Student.find({});
    resp.json(students);

      	})
      }
      addStudent(){
            this.app.get('/add-student', async (req,resp)=>{
                  resp.sendFile(this.path.join(__dirname,'.././views/admin/add-student.html'));
            })
      }
      uploadStudent() {
    // 1. Ensure the static route points to the correct absolute path
    // Assuming 'uploads' is in your root directory
    const uploadPath = path.join(process.cwd(), 'uploads');
    this.app.use('/uploads', express.static(uploadPath));

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/'); // Ensure this folder exists at root
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });

    const upload = multer({ storage });

    this.app.post('/add-student', upload.single('image'), async (req, resp) => {
        try {
            const data = {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                address: req.body.address,
                tel: req.body.tel,
                class: req.body.class,
                password:req.body.password,
                // Store the path that the static middleware expects
                image: req.file ? `/uploads/${req.file.filename}` : null 
            };

            await Student.create(data);
            resp.sendFile(path.join(__dirname, '../views/admin/add-student-success.html'));
        } catch (err) {
            resp.status(500).json({ error: err.message });
        }
    });
}
editStudent(){
    this.app.post('/edit', async function(req,resp){
console.log(req.body.id)
const id =req.body.id;
let findStudent = await Student.findById({_id:id});
resp.json({'Student':findStudent})
console.log(findStudent);
    })
}

updateStudent(){
    router.put('/update-student/:id', async (req, res) => {
  const studentId = req.params.id;
  const data = req.body;

  // Optional: If updating password, hash it here using bcrypt
  // if (data.password) data.password = await bcrypt.hash(data.password, 10);

  const result = await updateStudentRecord(studentId, data);

  if (result.success) {
    res.status(200).json(result.data);
  } else {
    res.status(400).json({ message: result.message || result.error });
  }
});

}

deleteStudent(){
    this.app.post('/delete-student', async (req,resp)=>{
        let id = req.id;
        let deleteStudent = await Student.findByIdAndDelete({id:id});
        if(deleteStudent){
            resp.json({'message':'Student Deleted'});
        }
    })
}
loginStudent(){
    this.app.get('/login-student', function(req,resp){
        resp.sendFile(path.join(__dirname,'.././views/login-student.html'));
    })
}
studentLogin(){
    this.app.post('/loging-student', async function(req,response){
        const {username,password}= req.body;
        let student = await Student.findOne({username})
        if(student){
        response.json({'message':'Login Successful','Student':student});
        }else{
            response.json({'message':'Student not found'});
        }
    });
}
studentProfile(){
    this.app.get('/student-profile', async(req,response)=>{
response.sendFile(path.join(__dirname,'.././views/students/profile.html'));
    });
}
updateStudent(){
   this.app.post("/update-student", async (req, res) => {
  try {
    const { name, address, class: userClass, username, email, tel, password, image } = req.body;

    // Never update password in plain text. Hash it first.
    let updateData = { name, address, class: userClass, username, email, tel, image };
    
    if (password) {
      const bcrypt = await import("bcrypt");
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true } // return updated doc, run schema validators
    ).select("-password"); // don't send password back

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

}
}



module.exports = StudentController;