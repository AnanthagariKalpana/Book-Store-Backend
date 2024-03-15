
import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service';


export const addToCart = async (req, res, next) => {
  try {
    //console.log(req.params._id);
    const data = await CartService.addToCart(req.params._id,req.body.userID);
    //console.log(data);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Cart Added successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getCart = async (req, res, next) => {
    try {
      //console.log(req.body.userID);
      const data = await CartService.getCart(req.body.userID);
      //console.log(data);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Cart fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  export const deleteCart = async (req, res, next) => {
    try {
      //console.log(req.body.userID);
      const data = await CartService.deleteCart(req.body.userID);
      //console.log(data);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Cart deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  export const removeCartItem = async (req, res, next) => {
    try {
      console.log(req.params._id);
      const data = await CartService.removeCartItem(req.params._id,req.body.userID);
      console.log(data);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Cart removed successfully'
      });
    } catch (error) {
      next(error);
    }
  };