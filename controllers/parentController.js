const Parent = require('../models/Parent');

class ParentsController {
  // POST /parents
  async createParent(req, res) {
    try {
      const parent = new Parent(req.body);
      await parent.save();
      res.status(201).json(parent);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // GET /parents
  async getParents(req, res) {
    try {
      const parents = await Parent.find().populate('students', 'firstName lastName');
      res.json(parents);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // GET /parents/:id
  async getParentById(req, res) {
    try {
      const parent = await Parent.findById(req.params.id).populate('students');
      if (!parent) return res.status(404).json({ error: 'Parent not found' });
      res.json(parent);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // PUT /parents/:id
  async updateParent(req, res) {
    try {
      const parent = await Parent.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!parent) return res.status(404).json({ error: 'Parent not found' });
      res.json(parent);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // DELETE /parents/:id
  async deleteParent(req, res) {
    try {
      const parent = await Parent.findByIdAndDelete(req.params.id);
      if (!parent) return res.status(404).json({ error: 'Parent not found' });
      res.json({ message: 'Parent deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

async loginParent(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const parent = await Parent.findOne({ email: email.toLowerCase() });
    if (!parent) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, parent.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: parent._id, role: 'parent' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { passwordHash, ...parentData } = parent.toObject();
    res.json({ token, parent: parentData });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
}

module.exports = new ParentsController();