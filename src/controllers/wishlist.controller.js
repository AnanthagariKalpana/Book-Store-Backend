
import HttpStatus from 'http-status-codes';
import * as WishListService from '../services/wishlist.service';


export const addWishlist = async (req, res, next) => {
  try {
    //console.log(req.params._id);
    const data = await WishListService.addWishlist(req.params._id,req.body.userID);
    //console.log(data);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Added to WishList successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getWishlist = async (req, res, next) => {
    try {
      //console.log(req.params._id);
      const data = await WishListService.getWishlist(req.body.userID);
      //console.log(data);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: ' WishList fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };