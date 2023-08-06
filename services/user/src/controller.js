import { find_user } from './service.js';
import Sender from './sender.js';
import Message from './message.js';

const get_user_by_id = async (req, res) => {
  const id = req.query.user_id;
  const user = await find_user('user_id', id);
  let http_status = 200;
  if (!user.success) {
    http_status = 400;
  }
  res.status(http_status).json(user);
};

const get_user_by_username = async (req, res) => {
  const username = req.query.username;
  const user = await find_user('username', username);
  let http_status = 200;
  if (!user.success) {
    http_status = 400;
  }
  res.status(http_status).json(user);
};

const get_user_posts = async (req, res) => {
  const user_id = req.query.user_id;
  const result = await Sender.send_user_posts(user_id);
  let http_status = 200;
  if (!result.success) {
    http_status = 400;
  }
  res.status(http_status).json(result);
};

const get_user_comments = async (req, res) => {
  const user_id = req.query.user_id;
  const result = await Sender.send_user_comments(user_id);
  let http_status = 200;
  if (!result.success) {
    http_status = 400;
  }
  res.status(http_status).json(result);
};

const follow = async (req, res) => {
  const user_id = req.user.id;
  const follows_id = req.query.user_id;

  if (user_id == follows_id) {
    return res.status(400).json(new Message('Cannot follow yourself', false));
  }
  const result = await Sender.send_follow(user_id, follows_id);
  let http_status = 200;
  if (!result.success) {
    http_status = 400;
  }
  res.status(http_status).json(result);
};

const unfollow = async (req, res) => {
  const user_id = req.user.id;
  const follows_id = req.query.user_id;

  if (user_id == follows_id) {
    return res.status(400).json(new Message('Cannot unfollow yourself', false));
  }
  const result = await Sender.send_unfollow(user_id, follows_id);
  let http_status = 200;
  if (!result.success) {
    http_status = 400;
  }
  res.status(http_status).json(result);
};

const get_all_followers = async (req, res) => {
  const user_id = req.query.user_id;
  const result = await Sender.send_all_followers(user_id);
  if (!result.success) {
    return res.status(400).json(result);
  }
  const followers = [];
  for (let index = 0; index < result.message.length; index++) {
    const user = await find_user('user_id', result.message[index].user_id);
    if (!user.success) {
      return res.status(400).json(user);
    }

    followers.push(user.message);
  }
  res.status(400).json(new Message(followers, true));
};

const is_follows = async (req, res) => {
  const user_id = req.user.id;
  const follows_id = req.query.user_id;

  if (user_id == follows_id) {
    return res.status(400).json(new Message('Cannot unfollow yourself', false));
  }
  const result = await Sender.send_is_follows(user_id, follows_id);
  let http_status = 200;
  if (!result.success) {
    http_status = 400;
  }
  res.status(http_status).json(result);
};

export {
  get_user_by_id,
  get_user_by_username,
  get_user_posts,
  get_user_comments,
  follow,
  unfollow,
  get_all_followers,
  is_follows,
};
