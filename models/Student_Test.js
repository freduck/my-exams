const mongoose = require ('mongoose');
// mongoose.connect('mongodb://localhost:27017/delambo',{}).then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('Error connecting to MongoDB:', err));
// const mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost:27017/delambo', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});


const testSchema = new mongoose.Schema({
  studentId: String,
  subject: String,
  testScore: Number
});

const Test= mongoose.model('Student_Test',testSchema);
module.exports = Test;