import express from 'express';
import * as bookController from '../controllers/book.controller'
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get All books
router.get('', bookController.getAll);


export default router;