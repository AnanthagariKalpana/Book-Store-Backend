
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
      const data = await BookService.sortBookByPrice(req.params.price);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'books are sorted'
      });
    } catch (error) {
      next(error);
    }
  };

  export const searchBook = async (req, res, next) => {
    try {
        console.log(req.body);
      const data = await BookService.searchBook(req.body.bookName);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'book searched successFully'
      });
    } catch (error) {
      next(error);
    }
  };