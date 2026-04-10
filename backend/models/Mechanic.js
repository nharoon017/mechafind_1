const mongoose = require('mongoose');

const mechanicSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, default: 'mechanic' },
  services: [{ type: String }],
  location: { type: String, required: true },
  contact: { type: String, required: true },
  isOpen: { type: Boolean, default: true },
}, { timestamps: true });

const Mechanic = mongoose.model('Mechanic', mechanicSchema);

module.exports = Mechanic;