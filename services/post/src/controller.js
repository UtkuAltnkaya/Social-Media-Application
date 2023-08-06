import Message from './helpers/message.js';
import { send_post_comments, send_post_delete_comments, send_post_one_comment } from './sender.js';
import PostService from './service.js';

class PostController {
  #service;
  #status;

  constructor() {
    this.#status = 0;
    this.#service = new PostService();
    this.get_post = this.get_post.bind(this);
    this.create_post = this.create_post.bind(this);
    this.delete_post = this.delete_post.bind(this);
    this.get_comments = this.get_comments.bind(this);
    this.get_one_comment = this.get_one_comment.bind(this);
  }

  async create_post(req, res) {
    const { title, content } = req.body;
    const result = await this.#service.create_post(title, content, req.user.id);
    this.#status = 201;
    if (!result.success) {
      this.#status = 400;
    }

    return res.status(this.#status).json(result);
  }

  async get_post(req, res) {
    const { post_id } = req.query;
    const result = await this.#service.find_by_post_id(post_id);
    this.#status = 200;
    if (!result.success) {
      this.#status = 400;
    }
    return res.status(this.#status).json(result);
  }

  async delete_post(req, res) {
    const { post_id } = req.query;
    const result = await this.#service.delete_post(post_id, req.user.id);
    this.#status = 200;
    if (!result.success) {
      return res.status(400).json(result);
    }
    const comment = await send_post_delete_comments(post_id);
    if (!comment.success) {
      this.#status = 400;
    }
    return res.status(this.#status).json(new Message({ post: result.message, comments: comment.message }, true));
  }

  async get_comments(req, res) {
    const { post_id } = req.query;
    const result = await send_post_comments(post_id);
    this.#status = 200;
    if (!result.success) {
      this.#status = 400;
    }
    return res.status(this.#status).json(result);
  }

  async get_one_comment(req, res) {
    const { post_id, comment_id } = req.query;
    const result = await send_post_one_comment(post_id, comment_id);
    this.#status = 200;
    if (!result.success) {
      this.#status = 400;
    }
    return res.status(this.#status).json(result);
  }
}

export default PostController;
