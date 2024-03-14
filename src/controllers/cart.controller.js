
import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service';


export const addToCart = async (req, res, next) => {
  try {
    //console.log(req.params._id);
    const data = await CartService.addToCart(req.params._id,req.body.userID);
    console.log(data);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Cart Added successfully'
    });
  } catch (error) {
    next(error);
  }
};