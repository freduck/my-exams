const mongoose = require ('mongoose');
// mongoose.connect('mongodb://localhost:27017/delambo',{}).then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('Error connecting to MongoDB:', err));

const conn = mongoose.createConnection('mongodb+srv://school:school@cluster0.fl8is4a.mongodb.net/delambo', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});


const AdminSchema = mongoose.Schema({
	name:String,
	email:String,
	username:String,
	password:String
});

const Admin = mongoose.model('Admin',AdminSchema);

module.exports = Admin;