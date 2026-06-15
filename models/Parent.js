const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
}, { timestamps: true });

module.exports = mongoose.model('Parent', parentSchema);