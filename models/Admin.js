require('dotenv').config();
const mongoose = require ('mongoose');
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const AdminSchema = new mongoose.Schema({
	name:String,
	email:String,
	username:String,
	password:String
});

const Admin = conn.model('Admin',AdminSchema);

module.exports = Admin;




// const conn = mongoose.createConnection('mongodb+srv://school:school@cluster0.fl8is4a.mongodb.net/delambo', {
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true,
// });