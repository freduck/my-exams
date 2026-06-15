const Parent = require('../models/Parent');

// Create parent
exports.createParent = async (req, res) => {
  try {
    const parent = new Parent(req.body);
    await parent.save();
    res.status(201).json(parent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all parents
exports.getParents = async (req, res) => {
  try {
    const parents = await Parent.find().populate('students', 'firstName lastName');
    res.json(parents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one parent by ID
exports.getParentById = async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id).populate('students');
    if (!parent) return res.status(404).json({ error: 'Parent not found' });
    res.json(parent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update parent
exports.updateParent = async (req, res) => {
  try {
    const parent = await Parent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!parent) return res.status(404).json({ error: 'Parent not found' });
    res.json(parent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete parent
exports.deleteParent = async (req, res) => {
  try {
    const parent = await Parent.findByIdAndDelete(req.params.id);
    if (!parent) return res.status(404).json({ error: 'Parent not found' });
    res.json({ message: 'Parent deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};