import Message from '../message.js';
import jwt from 'jsonwebtoken';

const verify_token = (token) => {
  if (!token) {
    throw new Message('Token is required', false);
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    throw new Message('Invalid/Expired token', false);
  }
};

const get_login_user = (req, res, next) => {
  const { cookies } = req;
  try {
    const loginUser = verify_token(cookies.token);
    req.user = loginUser;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export { get_login_user };
