import Message from '../helpers/error.js';

const validate_login = (req, res, next) => {
  const { email, password } = req.body;
  if (email != undefined && password != undefined) {
    const errors = check(email, password);
    let err = new Message(errors, Object.keys(errors) < 1);
    if (!err.success) {
      return res.json(err);
    }
    return next();
  }
  return res.json(new Message('Missing body item', false));
};

const check = (email, password) => {
  const errors = {};

  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }

  if (password === '') {
    errors.password = 'Password must not be empty';
  }

  return errors;
};

export { validate_login };
