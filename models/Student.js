





this.conn = mongoose.createConnection(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


  const studentSchema = new mongoose.Schema({
    name:String,
    address:String,
    class:String,
    username:String,
    email:String,
    tel:String,
    password:String,
    image:String
  });
 const Student = mongoose.model('Student',studentSchema);
 module.exports = Student;










//network connection
// const conn = mongoose.createConnection('mongodb+srv://school:school@cluster0.fl8is4a.mongodb.net/delambo', {
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true,
// });

// const studentSchema = new mongoose.Schema({ 


// name:String,
//     address:String,
//     class:String,
//     username:String,
//     email:String,
//     tel:String,
//     password:String,
//     image:String

//  });
// const Student = conn.model('Student', studentSchema);

// module.exports = Student;

