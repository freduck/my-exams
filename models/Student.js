const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/delambo', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

 const studentSchema = new mongoose.Schema({
    name:String,
    class:String,
    username:String,
    password:String,
    image:String
  });
 const Student = mongoose.model('Student',studentSchema);
 module.exports = Student;