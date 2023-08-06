import { PrismaClient } from '@prisma/client';

import { v4 as uuid } from 'uuid';
import Message from './helpers/message.js';

const { comment } = new PrismaClient();

class CommentService {
  static async create_comment(data) {
    data.comment_id = uuid();
    try {
      const item = await comment.create({ data });
      return new Message(['Comment created', item], true);
    } catch (error) {
      return new Message(['Comment not created', error], false);
    }
  }

  static async get_post_one_comment(post_id, comment_id) {
    try {
      const comments = await comment.findMany({
        where: {
          post_id,
          comment_id,
        },
      });
      if (!comments) {
        return new Message('Comment not found', false);
      }
      return new Message(comments, true);
    } catch (error) {
      return new Message(['Comment not found', error], false);
    }
  }

  static async get_post_comments(post_id) {
    try {
      const comments = await comment.findMany({
        where: {
          post_id,
        },
      });
      if (comments.length == 0) {
        return new Message('Comments not found', false);
      }
      return new Message(comments, true);
    } catch (error) {
      return new Message(['Comments not found', error], false);
    }
  }

  static async get_user_comments(user_id) {
    try {
      const comments = await comment.findMany({
        where: {
          user_id,
        },
      });
      if (comments.length == 0) {
        return new Message('Comments not found', false);
      }
      return new Message(comments, true);
    } catch (error) {
      return new Message(['Comments not found', error], false);
    }
  }

  static async delete_comment(comment_id, user_id) {
    try {
      const deleted_comment = await comment.delete({
        where: {
          comment_id,
          user_id,
        },
      });

      return new Message(['Comment deleted', deleted_comment], true);
    } catch (error) {
      return new Message(['Comment not deleted', error], false);
    }
  }

  static async delete_all_comments(post_id) {
    try {
      const deleted_comment = await comment.deleteMany({
        where: {
          post_id,
        },
      });
      return new Message(['Comments deleted', deleted_comment], true);
    } catch (error) {
      return new Message(['Comments not deleted', error], false);
    }
  }
}

export default CommentService;
