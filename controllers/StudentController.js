
const Student = require('.././models/Student');
class StudentController {
      constructor(app,path){
      	this.app = app;
      	this.path = path;
     
      }

      getStudents(){
      	this.app.get('/getstudents', async (req,resp)=>{
      	 	let  students = await Student.find();
      	 	console.log(students.email)
      	resp.json({students:students});

      	})
      }
      addStudent(){
            this.app.get('/add-student', async (req,resp)=>{
                  resp.sendFile(this.path.join(__dirname,'.././views/admin/add-student.html'));
            })
      }
      uploadStudent(){
            this.app.post('/add-student', async (req,resp)=>{
                  const {data} = req.body;
            })
      }
}



module.exports = StudentController;