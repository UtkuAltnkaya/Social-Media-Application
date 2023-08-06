import Message from '../helpers/error.js';

const validate_register = (req, res, next) => {
  const { username, name, surname, email, password, password_confirm } = req.body;

  if (
    username != undefined &&
    name != undefined &&
    surname != undefined &&
    email != undefined &&
    password != undefined &&
    password_confirm != undefined
  ) {
    const errors = check({ username, name, surname, email, password, password_confirm });
    let err = new Message(errors, Object.keys(errors) < 1);
    if (!err.success) {
      return res.json(err);
    }
    return next();
  }

  return req.json(new Message('Missing body item', false));
};

const check = ({ username, name, surname, email, password, password_confirm }) => {
  let errors = {};
  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }

  if (name.trim() === '') {
    errors.name = 'Name must not be empty';
  }

  if (surname.trim() === '') {
    errors.username = 'Surname must not be empty';
  }

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
  if (password_confirm === '') {
    errors.password_confirm = 'Password Confirm must not be empty';
  }
  return errors;
};

export { validate_register };
