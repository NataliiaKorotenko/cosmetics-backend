import Product from '../models/Product.js';

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера при получении товаров' });
  }
};

// POST /api/products
export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при создании товара', error: error.message });
  }
};

// PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Товар не найден' });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при обновлении товара', error: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Товар не найден' });
    }
    res.json({ message: 'Товар удалён' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении товара', error: error.message });
  }
};
