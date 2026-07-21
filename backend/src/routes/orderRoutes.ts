import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { createOrder, getOrderHistory, updateOrderStatus } from '../controllers/orderController';

const router = Router();

router.post('/', authenticate, createOrder);
router.get('/history', authenticate, getOrderHistory);
router.put('/:id/status', authenticate, authorize('restaurant', 'admin'), updateOrderStatus);

export default router;
