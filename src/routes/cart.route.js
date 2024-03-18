import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to addCart
router.post('/:_id', userAuth, cartController.addToCart);

//route to get the Cart
router.get('', userAuth, cartController.getCart);

//route to delete the cart
router.delete('', userAuth, cartController.deleteCart);

//route to remove the cart
router.delete('/:_id', userAuth, cartController.removeCartItem);

//route to purchase
router.put('', userAuth,cartController.isPurchase);



export default router;