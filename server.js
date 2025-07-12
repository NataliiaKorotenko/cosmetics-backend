import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';

import authRouter from "./routes/auth.js";
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { errorHendler } from './middlewares/errorHendler.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// auth

 app.use("/auth", authRouter);


app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Лог запросов 
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});


app.use(errorHendler)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port http://localhost:${PORT}`);
});
