import { Router } from 'express';
import userRoutes from './userRoutes';
import restaurantRoutes from './restaurantRoutes';
import orderRoutes from './orderRoutes';
import uploadRoutes from './uploadRoutes';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running smoothly' });
});

router.use('/users', userRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/orders', orderRoutes);
router.use('/upload', uploadRoutes);

export default router;
