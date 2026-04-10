require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Request } = require('./db');
const mechanicRoutes = require('./routes/mechanicRoutes');
const Mechanic = require('./models/Mechanic');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'mechafind_super_secret_key_2024';

// --- Middleware ---------------------------------------------------------------
app.use(cors({ origin: 'http://localhost:5173' })); // Allow Vite dev server
app.use(express.json());

// Mechanic routes
app.use('/api/mechanic', mechanicRoutes);

// --- Routes -------------------------------------------------------------------

/**
 * POST /api/register
 * Body: { name, email, password, role, workshopName?, serviceLocation?, specialization? }
 */
app.post('/api/register', async (req, res) => {
  const { name, email, password, role, workshopName, serviceLocation, specialization } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'Name, email, password, and role are required.' });
  }
  if (!['Customer', 'Mechanic'].includes(role)) {
    return res.status(400).json({ error: 'Role must be Customer or Mechanic.' });
  }
  if (role === 'Mechanic' && (!workshopName || !serviceLocation || !specialization)) {
    return res.status(400).json({ error: 'Workshop name, service location, and specialization are required for Mechanic accounts.' });
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role,
      workshopName: workshopName?.trim() || null,
      serviceLocation: serviceLocation?.trim() || null,
      specialization: specialization?.trim() || null,
    });

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        workshopName: user.workshopName,
        serviceLocation: user.serviceLocation,
        specialization: user.specialization,
      },
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

/**
 * POST /api/login
 * Body: { email, password }
 */
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ error: 'No account found with that email.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password. Please try again.' });
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        workshopName: user.workshopName,
        serviceLocation: user.serviceLocation,
        specialization: user.specialization,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

/**
 * GET /api/mechanics?location=<keyword>
 * Returns all mechanics, optionally filtered by location keyword (case-insensitive)
 */
app.get('/api/mechanics', async (req, res) => {
  const { location } = req.query;
  const filter = {};

  if (location && location.trim() !== '') {
    filter.location = { $regex: location.trim(), $options: 'i' };
  }

  try {
    const mechanics = await Mechanic.find(filter).sort({ createdAt: -1 }).lean();
    const formatted = mechanics.map((mechanic) => ({
      id: mechanic._id,
      name: mechanic.name,
      email: mechanic.email,
      workshopName: mechanic.name,
      location: mechanic.location,
      services: mechanic.services.join(', '),
      rating: (4.0 + Math.random()).toFixed(1),
      jobsFinished: 0,
      status: mechanic.isOpen === false ? 'closed' : 'available',
    }));

    res.json({ mechanics: formatted, total: formatted.length });
  } catch (err) {
    console.error('GET /api/mechanics error:', err);
    res.status(500).json({ error: 'Failed to fetch mechanics.' });
  }
});

/**
 * POST /api/requests
 * Used by Customer to request a specific mechanic.
 */
app.post('/api/requests', async (req, res) => {
  const { mechanicId, customerId, customerName, customerPhone, customerLatitude, customerLongitude, customerLocation, vehicle, issue } = req.body;

  if (!mechanicId || !customerName || !customerPhone || !vehicle || !issue) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (customerLatitude == null || customerLongitude == null) {
    return res.status(400).json({ error: 'Customer location is required so the mechanic can find you.' });
  }

  try {
    const request = await Request.create({
      mechanicId,
      userId: customerId || null,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerLatitude: Number(customerLatitude),
      customerLongitude: Number(customerLongitude),
      customerLocation: customerLocation?.trim() || null,
      vehicle: vehicle.trim(),
      issue: issue.trim(),
    });

    res.status(201).json({ message: 'Request sent successfully!', requestId: request._id });
  } catch (err) {
    console.error('POST /api/requests error:', err);
    res.status(500).json({ error: 'Failed to send request.' });
  }
});



/**
 * GET /api/requests/customer/:customer_id
 * Used by Customer dashboard to get all their requests.
 */
app.get('/api/requests/customer/:customer_id', async (req, res) => {
  const { customer_id } = req.params;

  try {
    const rows = await Request.find({ userId: customer_id })
      .sort({ createdAt: -1 })
      .populate('mechanicId', 'workshopName name contact')
      .lean();

    const formatted = rows.map((r) => {
      const mapUrl = (r.customerLatitude != null && r.customerLongitude != null)
        ? `https://www.google.com/maps/search/?api=1&query=${r.customerLatitude},${r.customerLongitude}`
        : null;

      return {
        id: r._id,
        mechanicName: r.mechanicId?.workshopName || r.mechanicId?.name || 'Unknown Mechanic',
        vehicle: r.vehicle,
        issue: r.issue,
        status: r.status,
        rating: r.rating,
        review: r.review,
        customerLatitude: r.customerLatitude,
        customerLongitude: r.customerLongitude,
        customerLocation: r.customerLocation || null,
        mapUrl,
        date: new Date(r.createdAt).toLocaleDateString(),
        time: new Date(r.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        messages: r.messages || [],
        mechanicPhone: r.mechanicId?.contact || null,
      };
    });

    res.json({ requests: formatted });
  } catch (err) {
    console.error('GET /api/requests/customer/:customer_id error:', err);
    res.status(500).json({ error: 'Failed to fetch your requests.' });
  }
});

/**
 * GET /api/requests/single/:request_id
 * Used for polling a single request to get updated messages.
 */
app.get('/api/requests/single/:request_id', async (req, res) => {
  try {
    const request = await Request.findById(req.params.request_id).populate('mechanicId', 'workshopName name contact').lean();
    if (!request) return res.status(404).json({ error: 'Request not found' });
    
    res.json({
      id: request._id,
      messages: request.messages || [],
      mechanicPhone: request.mechanicId?.contact || null,
      status: request.status
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch request.' });
  }
});

/**
 * GET /api/requests/:mechanic_id
 * Used by Mechanic dashboard to get all their jobs.
 */
app.get('/api/requests/:mechanic_id', async (req, res) => {
  const { mechanic_id } = req.params;

  try {
    const rows = await Request.find({ mechanicId: mechanic_id }).sort({ createdAt: -1 }).lean();
    const formatted = rows.map((r) => {
      const mapUrl = (r.customerLatitude != null && r.customerLongitude != null)
        ? `https://www.google.com/maps/search/?api=1&query=${r.customerLatitude},${r.customerLongitude}`
        : null;

      return {
        id: r._id,
        customer: r.customerName,
        phone: r.customerPhone,
        vehicle: r.vehicle,
        issue: r.issue,
        status: r.status,
        rating: r.rating,
        review: r.review,
        customerLatitude: r.customerLatitude,
        customerLongitude: r.customerLongitude,
        customerLocation: r.customerLocation || null,
        mapUrl,
        time: new Date(r.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        distance: r.customerLocation ? r.customerLocation : 'Location shared',
        messages: r.messages || [],
      };
    });

    res.json({ requests: formatted });
  } catch (err) {
    console.error('GET /api/requests/:mechanic_id error:', err);
    res.status(500).json({ error: 'Failed to fetch requests.' });
  }
});

/**
 * POST /api/requests/:request_id/message
 * Append a new message to a request.
 */
app.post('/api/requests/:request_id/message', async (req, res) => {
  const { sender, text } = req.body;
  
  if (!['Customer', 'Mechanic'].includes(sender) || !text || !text.trim()) {
    return res.status(400).json({ error: 'Invalid sender or message text.' });
  }

  try {
    const request = await Request.findByIdAndUpdate(
      req.params.request_id,
      { 
        $push: { 
          messages: { sender, text: text.trim() } 
        } 
      },
      { new: true }
    );

    if (!request) return res.status(404).json({ error: 'Request not found' });
    
    res.json({ message: 'Message sent', messages: request.messages });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

/**
 * PATCH /api/requests/:request_id/review
 * Used by Customer to submit a review after completion.
 */
app.patch('/api/requests/:request_id/review', async (req, res) => {
  const { request_id } = req.params;
  const { rating, review } = req.body;

  if (!request_id || !review || typeof review !== 'string' || review.trim().length === 0) {
    return res.status(400).json({ error: 'Rating and review text are required.' });
  }
  const numericRating = Number(rating);
  if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
    return res.status(400).json({ error: 'Rating must be an integer between 1 and 5.' });
  }

  try {
    const updated = await Request.findByIdAndUpdate(
      request_id,
      { rating: numericRating, review: review.trim() },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Request not found.' });
    }

    res.json({ message: 'Review saved successfully!' });
  } catch (err) {
    console.error('PATCH /api/requests/:request_id/review error:', err);
    res.status(500).json({ error: 'Failed to save the review.' });
  }
});

/**
 * PATCH /api/requests/:request_id
 * Used by Mechanic to change status to Accepted, Declined, or Completed.
 */
app.patch('/api/requests/:request_id', async (req, res) => {
  const { request_id } = req.params;
  const { status } = req.body;

  if (!['Accepted', 'Declined', 'Completed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status.' });
  }

  try {
    const updated = await Request.findByIdAndUpdate(
      request_id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Request not found.' });
    }

    res.json({ message: 'Status updated to ' + status });
  } catch (err) {
    console.error('PATCH /api/requests/:request_id error:', err);
    res.status(500).json({ error: 'Failed to update request status.' });
  }
});

/**
 * PATCH /api/users/profile
 * Allows users to update their profile (requires password verification)
 */
app.patch('/api/users/profile', async (req, res) => {
  const { userId, password, name, workshopName, serviceLocation } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ error: 'User ID and password are required.' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password. Profile update failed.' });
    }

    user.name = name?.trim() || user.name;
    if (workshopName !== undefined) user.workshopName = workshopName?.trim() || null;
    if (serviceLocation !== undefined) user.serviceLocation = serviceLocation?.trim() || null;
    await user.save();

    res.json({
      message: 'Profile updated successfully!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        workshopName: user.workshopName,
        serviceLocation: user.serviceLocation,
        specialization: user.specialization,
      }
    });
  } catch (err) {
    console.error('PATCH /api/users/profile error:', err);
    res.status(500).json({ error: 'Server error updating profile.' });
  }
});

/**
 * GET /api/health
 * Simple health check route
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'MechaFind backend is running ?', port: PORT });
});

// --- Start Server -------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`?? MechaFind backend running on http://localhost:${PORT}`);
});
