import { Router } from 'express';
import { getRestaurants, getRestaurantDetails, getRestaurantMenu, updateRestaurantStatus, getAllRestaurants } from '../controllers/restaurantController';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getRestaurants as any);
router.get('/:id', getRestaurantDetails as any);
router.get('/:id/menu', getRestaurantMenu as any);

// Admin Routes
router.get('/admin/all', authenticate as any, authorize('admin') as any, getAllRestaurants as any);
router.put('/:id/status', authenticate as any, authorize('admin') as any, updateRestaurantStatus as any);

export default router;
