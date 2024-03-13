import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUp = async (body) => {
  const existUser=await User.findOne({ email: body.email });
  if(existUser){
    throw new Error('User with this email already exist');
  }
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const data = await User.create({name:body.name, email:body.email, password:hashedPassword});
  return data;
};


export const login = async (email, password) => {
try{
  const user=await User.findOne({email});
  if(!user)
  {
    throw new Error('User not found')
  }
  const ispasswordValid=await bcrypt.compare(password,user.password);
  if(!ispasswordValid)
  {
    throw new Error('Invalid password');
  }
  var token = jwt.sign({id:user.id}, process.env.SECRET_KEY);
      console.log(token);
      return token;
}
catch(error)
{
  throw error;
}
};
