import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} from '../controllers/orderController.js';

import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

// Создать заказ (нужна авторизация)
router.post('/', authenticate, createOrder);

// Получить заказы текущего пользователя
router.get('/', authenticate, getUserOrders);

// Получить конкретный заказ по ID
router.get('/:id', authenticate, getOrderById);

// Обновить статус заказа
router.patch('/:id', authenticate, updateOrderStatus);

// Удалить заказ
router.delete('/:id', authenticate, deleteOrder);

export default router;
