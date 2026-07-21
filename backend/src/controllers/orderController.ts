import { Request, Response } from 'express';
import { Order, OrderItem, Food, Cart, CartItem, OrderStatus } from '../models';
import { AuthRequest } from '../middlewares/authMiddleware';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2025-01-27.acacia' as any,
});

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { restaurantId, addressId, items, deliveryFee, tax } = req.body;
    const userId = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart items are missing' });
    }

    // Calculate subtotal securely from DB, but for now we trust items array to have price and quantity (in prod, fetch from DB)
    let subtotal = 0;
    items.forEach((item: any) => {
      subtotal += item.price * item.quantity;
    });

    const grandTotal = subtotal + deliveryFee + tax;
    const orderNumber = `QE-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const order = await Order.create({
      orderNumber,
      userId,
      restaurantId,
      addressId: addressId || 'temp_address_id',
      status: OrderStatus.PENDING,
      subtotal,
      deliveryFee,
      platformFee: 0,
      tax,
      grandTotal,
    });

    // Create a Stripe Payment Intent
    let clientSecret = 'mock_client_secret';
    
    if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(grandTotal * 100), // amount in cents
        currency: 'usd',
        metadata: { orderId: order._id.toString() },
      });
      clientSecret = paymentIntent.client_secret || 'mock_client_secret';
    }

    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        order,
        clientSecret
      },
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
