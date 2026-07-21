import { Request, Response } from 'express';
import { Order, OrderItem, Food, Cart, CartItem, OrderStatus } from '../models';
import { AuthRequest } from '../middlewares/authMiddleware';

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { restaurantId, addressId } = req.body;
    const userId = req.user.id;

    // In a real flow, we would convert Cart to Order here.
    // For simplicity, we just fetch a cart and convert it.
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const orderNumber = `QE-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const order = await Order.create({
      orderNumber,
      userId,
      restaurantId,
      addressId,
      status: OrderStatus.PENDING,
      subtotal: cart.subtotal,
      deliveryFee: cart.deliveryFee,
      platformFee: cart.platformFee,
      tax: cart.tax,
      grandTotal: cart.grandTotal,
    });

    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error) {
    console.error('createOrder Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getOrderHistory = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: 'Order history retrieved successfully',
      data: orders,
    });
  } catch (error) {
    console.error('getOrderHistory Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
