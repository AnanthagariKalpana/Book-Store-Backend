
import HttpStatus from 'http-status-codes';
import * as BookService from '../services/book.service';


export const getAll = async (req, res, next) => {
  try {
    const data = await BookService.getAll();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'books fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};