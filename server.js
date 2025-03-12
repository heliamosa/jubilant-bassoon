const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true}));app.use(express.json());

// Connect to MongoDB
// const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, 
  socketTimeoutMS: 45000,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Default Route (Fixes "Cannot GET /")
app.get('/', (req, res) => {
  res.send('Welcome to the Social Network API! 🚀 Use /api/users or /api/thoughts in Insomnia/Postman.');
});

// Routes (API Endpoints)
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/thoughts', require('./routes/thoughtRoutes'));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
