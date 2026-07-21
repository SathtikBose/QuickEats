import { Router } from 'express';
import { getRestaurants, getRestaurantDetails, getRestaurantMenu } from '../controllers/restaurantController';

const router = Router();

router.get('/', getRestaurants as any);
router.get('/:id', getRestaurantDetails as any);
router.get('/:id/menu', getRestaurantMenu as any);

export default router;
