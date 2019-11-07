import { Router } from 'express';
import UserController from '../controllers/userController';
import Middleware from '../middleware/middleware';
import serverError from '../controllers/serverController';

const router = Router();

router.post('/signup', Middleware.validateSignup, Middleware.checkSignup, UserController.signup);
router.post('/signin', Middleware.validateLogin, Middleware.checkLogin, UserController.signin);
router.post('/error', serverError);

export default router;
