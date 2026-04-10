const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Mechanic = require('../models/Mechanic');
const { Request } = require('../db');
const { User } = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'mechafind_super_secret_key_2024';

// Register mechanic
const registerMechanic = async (req, res) => {
  const { name, email, password, services, location, contact } = req.body;

  if (!name || !email || !password || !services || !location || !contact) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    const existingMechanic = await Mechanic.findOne({ email: email.toLowerCase().trim() });
    if (existingMechanic) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const mechanic = await Mechanic.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      services: Array.isArray(services) ? services : services.split(',').map(s => s.trim()),
      location: location.trim(),
      contact: contact.trim(),
    });

    const token = jwt.sign(
      { id: mechanic._id.toString(), email: mechanic.email, role: 'mechanic' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Mechanic registered successfully!',
      data: { token, mechanic: { id: mechanic._id, name: mechanic.name, email: mechanic.email, role: mechanic.role } }
    });
  } catch (err) {
    console.error('Register mechanic error:', err);
    res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
};

// Login mechanic
const loginMechanic = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  try {
    const mechanic = await Mechanic.findOne({ email: email.toLowerCase().trim() });
    if (!mechanic) {
      return res.status(401).json({ success: false, message: 'No account found with that email.' });
    }

    const passwordMatch = await bcrypt.compare(password, mechanic.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect password.' });
    }

    const token = jwt.sign(
      { id: mechanic._id.toString(), email: mechanic.email, role: 'mechanic' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful!',
      data: { token, mechanic: { id: mechanic._id, name: mechanic.name, email: mechanic.email, role: mechanic.role } }
    });
  } catch (err) {
    console.error('Login mechanic error:', err);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
};

// Get mechanic profile
const getMechanicProfile = async (req, res) => {
  try {
    const mechanic = await Mechanic.findById(req.user.id).select('-password');
    if (!mechanic) {
      return res.status(404).json({ success: false, message: 'Mechanic not found.' });
    }
    res.json({ success: true, data: mechanic });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// Update mechanic profile
const updateMechanicProfile = async (req, res) => {
  const { services, location, contact, isOpen, password } = req.body;

  try {
    const mechanic = await Mechanic.findById(req.user.id);
    if (!mechanic) {
      return res.status(404).json({ success: false, message: 'Mechanic not found.' });
    }

    // Only require password if they are editing sensitive profile details (not just toggling open/close)
    if (services !== undefined || location !== undefined || contact !== undefined) {
      if (!password) {
        return res.status(400).json({ success: false, message: 'Current password is required to update details.' });
      }
      const isMatch = await bcrypt.compare(password, mechanic.password);
      if (!isMatch) {
         return res.status(401).json({ success: false, message: 'Incorrect password.' });
      }
    }

    if (services !== undefined) {
      mechanic.services = Array.isArray(services) ? services : services.split(',').map(s => s.trim());
    }
    if (location !== undefined) mechanic.location = location.trim();
    if (contact !== undefined) mechanic.contact = contact.trim();
    if (isOpen !== undefined) mechanic.isOpen = isOpen;

    await mechanic.save();

    res.json({ success: true, message: 'Profile updated successfully!', data: mechanic });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// Get mechanic requests
const getMechanicRequests = async (req, res) => {
  try {
    const requests = await Request.find({ mechanicId: req.user.id })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (err) {
    console.error('Get requests error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// Update request status
const updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Pending', 'Accepted', 'Declined', 'Completed'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status.' });
  }

  try {
    const request = await Request.findById(id);
    if (!request || request.mechanicId.toString() !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Request not found.' });
    }

    request.status = status;
    await request.save();

    res.json({ success: true, message: 'Status updated successfully!' });
  } catch (err) {
    console.error('Update status error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = {
  registerMechanic,
  loginMechanic,
  getMechanicProfile,
  updateMechanicProfile,
  getMechanicRequests,
  updateRequestStatus,
};