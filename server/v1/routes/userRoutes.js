import { Router } from 'express';
import UserController from '../controllers/userController';
import Middleware from '../middleware/middleware';

const router = Router();

router.post(
  '/signup',
  Middleware.validateSignup,
  Middleware.checkSignup,
  UserController.signup,
);

export default router;
