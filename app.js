import express, { json } from 'express';
const app = express();
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import dotenv from 'dotenv';
import cors from "cors"

dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(json());


// ✅ More secure CORS
const allowedOrigins = [
  'http://localhost:3000',
  'https://designs-by-afreen-frontend.vercel.app',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow no-origin requests (e.g., Postman) or allowed domains
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

export default app;
