import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import bookRoute from './book.route';
import cartRoute from './cart.route';
import wishlistRoute from './wishlist.route';

const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/book',bookRoute);
  router.use('/cart',cartRoute);
  router.use('/wishlist', wishlistRoute);

  return router;
};

export default routes;
