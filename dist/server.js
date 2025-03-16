import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import thoughtRoutes from './routes/thoughtRoutes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
// API Routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log(`❌ MongoDB Connection Error: ${err}`));
// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
