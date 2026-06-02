const Admin = require('.././models/Admin');
const Student = require('.././models/Student');
const Question = require('.././models/QuestionBank');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const express = require('express');
const path = require('path');

// Secret key
const secretKey = crypto.randomBytes(32).toString('base64');

class AdminClass {
	constructor(app, path) {
		this.app = app;
		this.path = path;
		this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
		this.secrete = '9Q11mISVPdruk6Ipwd8DtULh9ukTXY1eS53CeZ4lnn0=';
	}

	loginAdmin() {
		this.app.get('/login-admin', async (req, resp) => {
			resp.sendFile(this.path.join(__dirname, '.././views/admin/login.html'));
	});
	}

	AdminLogin() {
		this.app.post('/login-admin', async (req, resp) => {
			console.log(req.body);
			const { username, password } = req.body;
			let adminlogin = await Admin.findOne({ username: username });
			console.log(adminlogin);

			if (!adminlogin) {
				return resp.status(401).json({ message: 'Invalid Details Provided' });
			}

			let validPassword = await bcrypt.compare(password, adminlogin.password);
			if (!validPassword) {
				return resp.status(401).json({ message: 'Invalid Details Provided' });
			}

			const token = jwt.sign({ adminId: adminlogin._id }, this.secrete, { expiresIn: '1h' });
			resp.status(200).json({ message: 'Login Succesfull', name: adminlogin.name, email: adminlogin.email, username: adminlogin.username, token: token, adminId: adminlogin._id, status: 1 });
	});
	}

	addAdmin() {
		this.app.get('/add-admin', async (req, resp) => {
			resp.sendFile(this.path.join(__dirname, '.././views/admin/add-admin.html'));
	});
	}

	uploadAdmin() {
		this.app.post('/add-admin', async (req, resp) => {
			const { name, email, username, password } = req.body;
			let hash = await bcrypt.hash(password, 10);
			let add = await Admin.create({ name: name, email: email, username: username, password: hash });

			if (add) {
				resp.status(200).json({ "response": 'Admin Added' });
			} else {
				resp.status(500).json({ "response": "Error Uploading Admin" });
			}
	});
	}

	validateAdmin() {
		const authenticate = (req, res, next) => {
			const token = req.header('Authorization');
			if (!token) {
				return res.status(401).json({ message: 'Access denied. No token provided.' });
			}
			jwt.verify(token, this.secrete, (err, decoded) => {
				if (err) {
					return res.status(400).json({ message: 'Invalid token.' });
				}
				req.admin = decoded;
				next();
			});
	};
		this.app.get('/protected', authenticate, (req, res) => {
			res.json({ message: 'Hello, authenticated user!' });
	});
	}

	verify() {
		this.app.get('/verify', async (req, resp) => {
			resp.sendFile(this.path.join(__dirname, '.././views/admin/verifyAdmin.html'));
	});
	}

	adminAddScore() {
		this.app.get('/add-score', async (req, resp) => {
			resp.sendFile(this.path.join(__dirname, '.././views/admin/add-score.html'));
	});
	}

	dashboard() {
		this.app.get('/admin/dashboard', async (req, resp) => {
			resp.sendFile(this.path.join(__dirname, '.././views/admin/dashboard.html'));
	});
	}

	getStudents() {
		this.app.get('/getstudents', async (req, resp) => {
			const students = await Student.find({});
			resp.json(students);
	});
	}

	getQuestions() {
		this.app.get('/questions', async (req, resp) => {
			const questions = await Question.find({});
			resp.json(questions);
	});
	}
}

module.exports = AdminClass;