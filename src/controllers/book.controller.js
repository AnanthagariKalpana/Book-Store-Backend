
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

export const getBookById = async (req, res, next) => {
    try {
      const data = await BookService.getBookById(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'books fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  export const sortBookByPrice = async (req, res, next) => {
    try {
      const data = await BookService.sortBookByPrice();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'books are sorted'
      });
    } catch (error) {
      next(error);
    }
  };