import Message from './message.js';
import User from './models/User.js';

const create_user_service = async (user) => {
  const db_user = new User(user);
  try {
    await db_user.save();
    return new Message('User created', true);
  } catch (error) {
    return new Message('User not created' + error, false);
  }
};

const find_user = async (key, value) => {
  try {
    const user = await User.findOne({ [key]: value });
    if (!user) {
      return new Message('User not found', false);
    }
    return new Message(user, true);
  } catch (error) {
    return new Message('User not found', false);
  }
};

export { create_user_service, find_user };
