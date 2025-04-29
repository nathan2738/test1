const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serves static files like index.html

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const User = mongoose.model('User', userSchema);

// Booking Schema (for installations, maintenance, consultations)
const bookingSchema = new mongoose.Schema({
  username: String,
  serviceType: String, // Could be 'installation', 'maintenance', or 'consultation'
  serviceDate: Date,
  issueDescription: String,
  consultationType: String, // Only for consultations ('live' or 'face-to-face')
});
const Booking = mongoose.model('Booking', bookingSchema);

// Signup Route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.json({ message: "Username already taken." });
  }

  const newUser = new User({ username, email, password });
  await newUser.save();
  res.json({ message: "Signup successful!" });
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Incorrect password!" });
  }

  res.json({ message: "Login successful!" });
});

// Booking Route for Installations
app.post('/book-installation', async (req, res) => {
  const { username, serviceDate, issueDescription } = req.body;

  try {
    const newBooking = new Booking({
      username,
      serviceType: 'installation',
      serviceDate,
      issueDescription,
    });
    await newBooking.save();
    res.json({ message: 'Installation booked successfully!' });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'An error occurred during installation booking.' });
  }
});

// Booking Route for Maintenance
app.post('/book-maintenance', async (req, res) => {
  const { username, serviceDate, issueDescription } = req.body;

  try {
    const newBooking = new Booking({
      username,
      serviceType: 'maintenance',
      serviceDate,
      issueDescription: issueDescription + ' (Maintenance)',
    });
    await newBooking.save();
    res.json({ message: 'Maintenance booked successfully!' });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'An error occurred during maintenance booking.' });
  }
});

// Booking Route for Consultations
app.post('/book-consultation', async (req, res) => {
  const { username, serviceDate, consultationType } = req.body;

  try {
    const newBooking = new Booking({
      username,
      serviceType: 'consultation',
      serviceDate,
      consultationType, // live or face-to-face
    });
    await newBooking.save();
    res.json({ message: 'Consultation booked successfully!' });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'An error occurred during consultation booking.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
