import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';


export const signUp = async (req, res, next) => {
  try {
    const data = await UserService.signUp(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};


export const login = async (req, res, next) => {
  try {
    const{email,password}=req.body;
    const data = await UserService.login(email, password);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User Login successfully'
    });
  } catch (error) {
    next(error);
  }
};

