import { verify_token } from '../helpers/auth.js';

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
