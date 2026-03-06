const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/delambo',{}).then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

const AdminSchema = mongoose.Schema({
	name:String,
	email:String,
	username:String,
	password:String
});

const Admin = mongoose.model('Admin',AdminSchema);

module.exports = Admin;