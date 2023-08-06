import Message from './message.js';
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

export { verify_token };
