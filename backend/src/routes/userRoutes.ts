import { Router } from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController';
import { validateRequest } from '../middlewares/validateRequest';
import { registerSchema, loginSchema } from '../validators/userValidator';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', validateRequest(registerSchema), registerUser as any);
router.post('/login', validateRequest(loginSchema), loginUser as any);
router.get('/profile', authenticate as any, getUserProfile as any);

export default router;
