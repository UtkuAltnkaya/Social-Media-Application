import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
  return jwt.sign(
    {
      id,
    },
    JWT_SECRET_KEY,
    {
      expiresIn: JWT_EXPIRE,
    },
  );
};

export { generateToken };
