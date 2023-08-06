import Message from '../helpers/error.js';
import Auth from '../models/auth.js';

const login_service = async (email) => {
  try {
    const db_user = await Auth.findOne({ email });
    if (!db_user) {
      return new Message('User not found', false);
    }

    return new Message(db_user, true);
  } catch (error) {
    return new Message('User not found', false);
  }
};

export { login_service };
