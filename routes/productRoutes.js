import express from 'express';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

// GET /api/products — получить все товары
router.get('/', getProducts);

// POST /api/products — создать новый товар
router.post('/', createProduct);

// PUT /api/products/:id — обновить товар по id
router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export default router;
