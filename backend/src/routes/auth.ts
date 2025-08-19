import { Router } from 'express';
import { signup, login } from '../controllers/authController';
import { validate, signupSchema, loginSchema } from '../middleware/validation';

const router = Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);

export default router;