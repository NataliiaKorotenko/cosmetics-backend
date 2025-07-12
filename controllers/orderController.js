import Order from '../models/Order.js';

// Создание нового заказа
export const createOrder = async (req, res) => {
  try {
    const { items, totalPrice, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Корзина пуста' });
    }

    const order = new Order({
      user: req.user._id,
      items,
      totalPrice,
      shippingAddress,
      paymentMethod,
      status: 'pending',
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Ошибка при создании заказа:', error);
    res.status(500).json({ message: 'Не удалось создать заказ' });
  }
};

// Получение всех заказов текущего пользователя
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить заказы' });
  }
};

// Получение одного заказа по ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order || order.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении заказа' });
  }
};

// Обновление статуса заказа
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order || order.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    order.status = status;
    const updated = await order.save();

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении заказа' });
  }
};

// Удаление заказа
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order || order.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    await order.remove();
    res.json({ message: 'Заказ удалён' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении заказа' });
  }
};

// Получение всех заказов (для админа)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить заказы' });
  }
};