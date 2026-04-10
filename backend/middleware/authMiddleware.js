const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'mechafind_super_secret_key_2024';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token.' });
  }
};

// Middleware to check if user is mechanic
const requireMechanic = (req, res, next) => {
  if (req.user.role !== 'mechanic') {
    return res.status(403).json({ success: false, message: 'Access denied. Mechanic role required.' });
  }
  next();
};

module.exports = { verifyToken, requireMechanic };