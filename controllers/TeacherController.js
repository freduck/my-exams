// controllers/TeacherController.js
const Teacher = require('../models/Teacher');

class TeacherController {
  // CREATE - Add new teacher
  async create(req, res) {
    try {
      const teacher = await Teacher.create(req.body);
      res.status(201).json({ success: true, data: teacher });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // READ ALL - Get all teachers
  async getAll(req, res) {
    try {
      const teachers = await Teacher.find();
      res.status(200).json({ success: true, data: teachers });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // READ ONE - Get teacher by ID
  async getById(req, res) {
    try {
      const teacher = await Teacher.findById(req.params.id);
      if (!teacher) {
        return res.status(404).json({ success: false, message: 'Teacher not found' });
      }
      res.status(200).json({ success: true, data: teacher });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // UPDATE - Update teacher by ID
  async update(req, res) {
    try {
      const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!teacher) {
        return res.status(404).json({ success: false, message: 'Teacher not found' });
      }
      res.status(200).json({ success: true, data: teacher });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // DELETE - Remove teacher by ID
  async delete(req, res) {
    try {
      const teacher = await Teacher.findByIdAndDelete(req.params.id);
      if (!teacher) {
        return res.status(404).json({ success: false, message: 'Teacher not found' });
      }
      res.status(200).json({ success: true, message: 'Teacher deleted' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new TeacherController();
