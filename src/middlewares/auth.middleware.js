import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    req.user=  jwt.verify(bearerToken, process.env.SECRET_KEY);
  //   res.locals.user = user;
  //  // req.body.user=user;
    //console.log("auth.........",req.user);
  //   res.locals.token = bearerToken;
    
    next();
  } catch (error) {
    next(error);
  }
};
