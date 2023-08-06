import Message from '../message.js';
import { validate } from 'uuid';

const validate_id = (req, res, next) => {
  const id = req.query.user_id;
  if (id == undefined) {
    return res.json(new Message('User id required', false));
  }

  if (!validate(id)) {
    return res.json(new Message('User id is not valid', false));
  }
  next();
};

const validate_id_second = (req, res, next) => {
  const id = req.query.user_id_second;
  if (id == undefined) {
    return res.json(new Message('User id required', false));
  }

  if (!validate(id)) {
    return res.json(new Message('User id is not valid', false));
  }
  next();
};

const validate_username = (req, res, next) => {
  const username = req.query.username;
  if (username == undefined) {
    return res.json(new Message('Username required', false));
  }

  if (username.length > 15) {
    return res.json(new Message('Username is too long', false));
  }

  next();
};

export { validate_id, validate_id_second, validate_username };
