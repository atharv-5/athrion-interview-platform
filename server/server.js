import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/apiRoutes.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map(url => url.trim())
  : ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Root check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'AI Interview Prep API running smoothly!' });
});

// API Routes
app.use('/api', apiRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error Hook:', err.message);
  res.status(500).json({
    message: err.message || 'An unhandled server error occurred.'
  });
});

// Database connection & Server Boot
const startServer = async () => {
  const dbStatus = await connectDB();
  
  app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`🚀 Server listening on Port: ${PORT}`);
    console.log(`🚀 Environment: Development`);
    console.log(`🚀 Database status: Running on [${dbStatus.type.toUpperCase()}] mode`);
    console.log(`🚀 Local client allowed: http://localhost:5173`);
    console.log(`=================================================`);
  });
};

startServer();
