import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; 
import userRoutes from './routes/userRoutes.js'; 
import thoughtRoutes from './routes/thoughtRoutes.js'; 

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the Social Network API! 🚀 Use /api/users or /api/thoughts in Insomnia/Postman.');
});

// API Routes
app.use('/api/users', userRoutes);  
app.use('/api/thoughts', thoughtRoutes);  

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
