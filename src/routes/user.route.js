import express from 'express';
import * as userController from '../controllers/user.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('', userController.signUp);
//route to login a user
router.post('/login',userController.login);

export default router;
