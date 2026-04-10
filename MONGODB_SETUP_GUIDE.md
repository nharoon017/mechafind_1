# MongoDB Setup Guide for MechaFind

## Current System vs MongoDB

### What You Have Now (SQLite)
- **Database**: SQLite (file-based)
- **File Location**: `backend/database.sqlite`
- **Best For**: Small projects, local testing
- **Limitations**: 
  - Limited concurrent connections
  - Not scalable for production
  - Single file storage
  - Poor performance with large data

### Why MongoDB is Better

MongoDB is a **NoSQL database** - it stores data as flexible JSON-like documents instead of rigid tables.

#### Benefits of MongoDB:
1. **Scalability** - Easily handles millions of records
2. **Flexibility** - Add fields to documents without migrations
3. **Performance** - Optimized for read/write operations
4. **Cloud Ready** - Works seamlessly with MongoDB Atlas (cloud)
5. **Real-time** - Better for live data like service requests
6. **Developer Friendly** - JSON structure matches JavaScript objects

---

## How to Migrate to MongoDB

### Step 1: Install MongoDB Locally (Optional Testing)
```bash
# Download from https://www.mongodb.com/try/download/community
# Or use MongoDB Atlas (recommended - cloud-based)
```

### Step 2: Create MongoDB Atlas Account (Recommended)
```
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free tier available)
3. Create a cluster
4. Get connection string: mongodb+srv://username:password@cluster.mongodb.net/database
```

### Step 3: Install MongoDB Driver in Your Backend
```bash
cd backend
npm install mongodb mongoose
```

**Option A: Using `mongodb` (Low-level)**
```bash
npm install mongodb
```

**Option B: Using `mongoose` (Recommended - ORM for MongoDB)**
```bash
npm install mongoose
```

---

## Replacing SQLite with MongoDB

### Current Setup (SQLite)
```javascript
// backend/db.js - OLD SQLite
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) console.error(err.message);
  else console.log('Connected to SQLite database');
});

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  workshopName TEXT,
  serviceLocation TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)`);
```

### New Setup (MongoDB with Mongoose)
```javascript
// backend/db.js - NEW MongoDB
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mechafind', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User Schema (like table structure)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  workshopName: String,
  serviceLocation: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
```

---

## Data Schema Examples

### Users Collection
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "Syed Haroon",
  email: "syed@mechafind.com",
  password: "hashed_password_here",
  workshopName: "Syed's Auto Repair",
  serviceLocation: "Hyderabad, Telangana",
  phoneNumber: "9876543210",
  rating: 4.8,
  totalJobs: 142,
  isVerified: true,
  createdAt: ISODate("2026-04-08T10:30:00Z"),
  updatedAt: ISODate("2026-04-08T15:45:00Z")
}
```

### Service Requests Collection
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  customerId: ObjectId("507f1f77bcf86cd799439011"),
  mechanicId: ObjectId("507f1f77bcf86cd799439010"),
  serviceType: "Engine Repair",
  description: "Engine making noise",
  location: "Vijayawada, AP",
  status: "accepted", // pending, accepted, completed, cancelled
  requestedAt: ISODate("2026-04-08T10:00:00Z"),
  scheduledFor: ISODate("2026-04-08T14:00:00Z"),
  completedAt: ISODate("2026-04-08T16:30:00Z"),
  estimatedCost: 2500,
  actualCost: 2800,
  paymentStatus: "completed",
  rating: 5,
  review: "Great service, very professional",
  images: ["url1.jpg", "url2.jpg"]
}
```

---

## Step 4: Update Backend API Endpoints

### OLD (SQLite)
```javascript
app.post('/api/users', (req, res) => {
  const { name, email, password } = req.body;
  
  db.run(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, email });
    }
  );
});
```

### NEW (MongoDB)
```javascript
const User = require('../models/User');

app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const user = new User({ name, email, password });
    await user.save();
    
    res.json({ id: user._id, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

---

## Environment Variables Setup

### Create `.env` file in backend folder
```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mechafind

# Or for local MongoDB
MONGODB_URI=mongodb://localhost:27017/mechafind

# JWT Secret
JWT_SECRET=your_secret_key_here

# Port
PORT=5000

# Node Environment
NODE_ENV=development
```

### Load in `server.js`
```javascript
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);
```

---

## Advantages in Real-time Operations

### Service Requests (Real-time)
```javascript
// MongoDB allows flexible queries for real-time data
const pendingRequests = await ServiceRequest.find({
  mechanicId: mechanic._id,
  status: 'pending'
}).sort({ requestedAt: -1 }).limit(10);

// Add fields dynamically
request.isPriority = location.distance < 5;
request.estimatedArrival = calculateTime(location);
await request.save();
```

### Analytics Queries
```javascript
// MongoDB aggregation pipeline for analytics
const stats = await ServiceRequest.aggregate([
  { $match: { mechanicId: mechanic._id, status: 'completed' } },
  {
    $group: {
      _id: null,
      totalJobs: { $sum: 1 },
      totalEarnings: { $sum: '$actualCost' },
      avgRating: { $avg: '$rating' }
    }
  }
]);
```

---

## Migration Checklist

- [ ] Create MongoDB Atlas account
- [ ] Get connection string
- [ ] Install mongoose/mongodb package
- [ ] Create schema files for all data models
- [ ] Update database.js to use MongoDB
- [ ] Rewrite API endpoints for MongoDB
- [ ] Test all CRUD operations
- [ ] Import existing SQLite data (if needed)
- [ ] Deploy to production environment

---

## Recommended Tools

1. **MongoDB Atlas**: Free cloud database
   - https://www.mongodb.com/cloud/atlas

2. **MongoDB Compass**: GUI for viewing data
   - https://www.mongodb.com/products/compass

3. **Postman**: API testing
   - https://www.postman.com

4. **Mongoose Documentation**: https://mongoosejs.com

---

## When to Migrate
- When you're ready for production
- When your database grows beyond 100K users
- When you need real-time features
- When deploying to AWS/Heroku/Digital Ocean

**Current SQLite is fine for**: Local development and testing

**MongoDB recommended for**: Production deployment
