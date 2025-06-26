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
app.use(cors({
    origin: "*"
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

export default app;
