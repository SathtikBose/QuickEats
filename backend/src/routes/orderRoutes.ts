import { Router } from 'express';
import { createOrder, getOrderHistory } from '../controllers/orderController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authenticate as any, createOrder as any);
router.get('/', authenticate as any, getOrderHistory as any);

export default router;
