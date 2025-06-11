import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

// Инициализация переменных окружения
dotenv.config();

// Подключение к базе данных
connectDB();

const app = express();

// Мидлвары
app.use(cors());
app.use(express.json());

// Роуты
app.use('/api/products', productRoutes);

// Лог запросов (по желанию можно оставить для отладки)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// Запуск сервера
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});
