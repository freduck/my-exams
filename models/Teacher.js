const teacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  qualification: String,
  phone: String,
  password: String
});

module.exports = mongoose.model('Teacher', teacherSchema);