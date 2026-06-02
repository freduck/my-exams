const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Question = require('../models/QuestionBank');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const path = require('path');

class AdminClass {
  constructor(app, basePath) {
    this.app = app;
    this.basePath = basePath;
    this.secret = '9Q11mISVPdruk6Ipwd8DtULh9ukTXY1eS53CeZ4lnn0='; // use env var in prod

    this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    this.setupRoutes();
  }

  setupRoutes() {
    this.loginAdmin();
    this.adminLogin();
    this.addAdmin();
    this.uploadAdmin();
    this.validateAdmin();
    this.verify();
    this.adminAddScore();
    this.dashboard();
    this.getStudents();
    this.getQuestions();
  }

  loginAdmin() {
    this.app.get('/login-admin', (req, res) => {
      res.sendFile(path.join(this.basePath, 'views/admin/login.html'));
    });
  }

  adminLogin() {
    this.app.post('/login-admin', async (req, res) => {
      try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });
        if (!admin) {
          return res.status(401).json({ message: 'Invalid Details Provided' });
        }

        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
          return res.status(401).json({ message: 'Invalid Details Provided' });
        }

        const token = jwt.sign({ adminId: admin._id }, this.secret, { expiresIn: '1h' });

        res.json({
          message: 'Login Successful',
          name: admin.name,
          email: admin.email,
          username: admin.username,
          token,
          adminId: admin._id,
          status: 1
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
    });
  }

  addAdmin() {
    this.app.get('/add-admin', (req, res) => {
      res.sendFile(path.join(this.basePath, 'views/admin/add-admin.html'));
    });
  }

  uploadAdmin() {
    this.app.post('/add-admin', async (req, res) => {
      try {
        const { name, email, username, password } = req.body;

        const hash = await bcrypt.hash(password, 12); // correct hashing

        const admin = await Admin.create({ name, email, username, password: hash });

        res.status(201).json({ response: 'Admin Added', id: admin._id });
      } catch (err) {
        console.error(err);
        if (err.code === 11000) {
          return res.status(400).json({ response: 'Username or email already exists' });
        }
        res.status(500).json({ response: 'Error Uploading Admin' });
      }
    });
  }

  validateAdmin() {
    const authenticate = (req, res, next) => {
      const authHeader = req.header('Authorization');
      if (!authHeader) return res.status(401).json({ message: 'Access denied. No token provided.' });

      const token = authHeader.split(' ')[1]; // Bearer <token>
      jwt.verify(token, this.secret, (err, decoded) => {
        if (err) return res.status(400).json({ message: 'Invalid token.' });
        req.admin = decoded;
        next();
      });
    };

    this.app.get('/protected', authenticate, (req, res) => {
      res.json({ message: 'Hello, authenticated user!', admin: req.admin });
    });
  }

  verify() {
    this.app.get('/verify', (req, res) => {
      res.sendFile(path.join(this.basePath, 'views/admin/verifyAdmin.html'));
    });
  }

  adminAddScore() {
    this.app.get('/add-score', (req, res) => {
      res.sendFile(path.join(this.basePath, 'views/admin/add-score.html'));
    });
  }

  dashboard() {
    this.app.get('/admin/dashboard', (req, res) => {
      res.sendFile(path.join(this.basePath, 'views/admin/dashboard.html'));
    });
  }

  getStudents() {
    this.app.get('/getstudents', async (req, res) => {
      const students = await Student.find({});
      res.json(students);
    });
  }

  getQuestions() {
    this.app.get('/questions', async (req, res) => {
      const questions = await Question.find({});
      res.json(questions);
    });
  }
}

module.exports = AdminClass;