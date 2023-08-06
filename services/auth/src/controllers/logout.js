import Message from '../helpers/error.js';

const logout = (req, res) => {
  const { cookies } = req;

  if (!cookies.token) {
    return res.status(400).json(new Message('No token found', false));
  }
  res.clearCookie('token');
  return res.status(200).json(new Message('Logged out successfully', true));
};

export { logout };
