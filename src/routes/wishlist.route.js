import express from 'express';
import * as WishlistController from '../controllers/wishlist.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add wishList
router.post('/:_id', userAuth, WishlistController.addWishlist);

//route to get wishList
router.get('', userAuth, WishlistController.getWishlist);




export default router;