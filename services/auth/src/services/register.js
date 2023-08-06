import Message from '../helpers/error.js';
import Auth from '../models/auth.js';
import { v4 as uuid } from 'uuid';

const register_service = async (email, password) => {
  const user_id = uuid();
  const authUser = new Auth({ user_id, email, password });
  try {
    const saved = await authUser.save();
    return new Message(saved, true);
  } catch (error) {
    return new Message('User not created', false);
  }
};

export { register_service };
