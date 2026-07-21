import { Router } from 'express';
import { registerUser, loginUser, getUserProfile, getAllUsers, updateUserStatus } from '../controllers/userController';
import { validateRequest } from '../middlewares/validateRequest';
import { registerSchema, loginSchema } from '../validators/userValidator';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', validateRequest(registerSchema), registerUser as any);
router.post('/login', validateRequest(loginSchema), loginUser as any);
router.get('/profile', authenticate as any, getUserProfile as any);

// Admin routes
router.get('/', authenticate as any, authorize('admin') as any, getAllUsers as any);
router.put('/:id/status', authenticate as any, authorize('admin') as any, updateUserStatus as any);

export default router;
