import { login_service } from '../services/login.js';
import { comparePassword } from '../helpers/hashPassword.js';
import { generateToken } from '../helpers/token.js';
import Message from '../helpers/error.js';

const login = async (req, res) => {
  const { email, password } = req.body;

  const db_user = await login_service(email);

  if (db_user.success == false) {
    return res.json(db_user);
  }

  if (!comparePassword(password, db_user.data.password)) {
    return res.json(new Message('Wrong credentials', false));
  }

  const token = generateToken(db_user.data.user_id);
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.json(new Message('Logged in', true));
};

export { login };
