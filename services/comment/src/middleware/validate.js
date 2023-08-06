import Message from '../helpers/message.js';
import { validate } from 'uuid';

const validate_comment = (req, res, next) => {
  const { content } = req.body;

  if (content != undefined) {
    const errors = check(content);
    const err = new Message(errors, Object.keys(errors) < 1);
    if (!err.success) {
      return res.json(err);
    }
    return next();
  }
  return res.json(new Message('Missing body item', false));
};

const validate_comment_id = (req, res, next) => {
  const comment_id = req.query.comment_id;

  if (!comment_id) {
    return res.status(400).json(new Message('Missing comment id', false));
  }

  if (!validate(comment_id)) {
    return res.status(400).json(new Message('Comment is not in valid form', false));
  }
  return next();
};

const validate_post_id = (req, res, next) => {
  const post_id = req.query.post_id;

  if (!post_id) {
    return res.status(400).json(new Message('Missing post id', false));
  }

  if (!validate(post_id)) {
    return res.status(400).json(new Message('Post id is not in valid form', false));
  }
  return next();
};

const validate_user_id = (req, res, next) => {
  const user_id = req.query.user_id;

  if (!user_id) {
    return res.json(new Message('Missing user id', false));
  }

  if (!validate(user_id)) {
    return res.json(new Message('User id is not in valid form', false));
  }
  return next();
};

const check = (content) => {
  const errors = {};
  if (content.trim() === '') {
    errors.content = 'Content must not be empty';
  }
  return errors;
};
export { validate_comment, validate_comment_id, validate_post_id, validate_user_id };
