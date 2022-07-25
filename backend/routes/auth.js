import express from 'express';
import { body, validationResult} from 'express-validator';
import { login, register, checkAuth } from '../controllers/authController.js';
import { authValidation } from '../middleware/authMiddleware.js';
const  route = express.Router();
const validation = [
    body('name').isLength({min: 5}),
    body('email').isEmail(),
    body('password').isString()
]
route.post('/register', validation, register);
route.post('/login', login);
route.post('/check', authValidation, checkAuth);
export default route;
