import express from 'express';
import * as bookController from '../controllers/book.controller'
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get All books
router.get('', userAuth, bookController.getAll);
//route to sort the book by Price//if price==1->ascending,price==-1->descending
router.get('/sort/:price', userAuth, bookController.sortBookByPrice);
//route to search the book
router.get('/search',userAuth, bookController.searchBook);
//route to get book by Id
router.get('/:_id',userAuth ,bookController.getBookById);



export default router;