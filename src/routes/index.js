import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import bookRoute from './book.route';

const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/book',bookRoute);

  return router;
};

export default routes;
