require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mechafind';
mongoose.set('strictQuery', false);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(`✅ Connected to MongoDB: ${MONGO_URI}`))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Customer', 'Mechanic'], required: true },
  workshopName: { type: String, default: null },
  serviceLocation: { type: String, default: null },
  specialization: { type: String, default: null },
}, { timestamps: true });
const messageSchema = new mongoose.Schema({
  sender: { type: String, enum: ['Customer', 'Mechanic'], required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const serviceRequestSchema = new mongoose.Schema({
  mechanicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mechanic', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerLatitude: { type: Number, default: null },
  customerLongitude: { type: Number, default: null },
  customerLocation: { type: String, default: null },
  vehicle: { type: String, required: true },
  issue: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Accepted', 'Declined', 'Completed'], default: 'Pending' },
  rating: { type: Number, min: 1, max: 5, default: null },
  review: { type: String, default: null },
  messages: { type: [messageSchema], default: [] },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Request = mongoose.model('Request', serviceRequestSchema);

module.exports = { mongoose, User, Request };
