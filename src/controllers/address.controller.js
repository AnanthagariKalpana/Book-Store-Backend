
import HttpStatus from 'http-status-codes';
import * as addressService from '../services/address.service';


export const addAddress = async (req, res, next) => {
  try {
    //console.log(req.params._id);
    const data = await addressService.addAddress(req.body);
    //console.log(data);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Address Added successfully'
    });
  } catch (error) {
    next(error);
  }
};