import express from 'express';
import * as bookController from '../controllers/book.controller'
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get All books
router.get('', bookController.getAll);

router.get('/sort', bookController.sortBookByPrice)

//route to get book by Id
router.get('/:_id',bookController.getBookById);
//route to sort the book by Price


export default router;