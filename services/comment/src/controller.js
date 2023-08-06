import CommentService from './service.js';

class CommentController {
  static async create_comment(req, res) {
    const data = {
      content: req.body.content,
      user_id: req.user.id,
      post_id: req.query.post_id,
    };
    const result = await CommentService.create_comment(data);

    let http_status = 201;
    if (!result.success) {
      http_status = 400;
    }
    return res.status(http_status).json(result);
  }

  static async delete_comment(req, res) {
    const comment_id = req.query.comment_id;
    const user_id = req.user.id;

    const result = await CommentService.delete_comment(comment_id, user_id);
    let http_status = 200;
    if (!result.success) {
      http_status = 400;
    }
    return res.status(http_status).json(result);
  }
}

export default CommentController;
