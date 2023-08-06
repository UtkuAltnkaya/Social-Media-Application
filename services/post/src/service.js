import { PrismaClient } from '@prisma/client';

import { v4 as uuid } from 'uuid';
import Message from './helpers/message.js';

const { post } = new PrismaClient();

class PostService {
  constructor() {}

  async create_post(title, content, user_id) {
    const post_id = uuid().toString();
    const insert = {
      title: title,
      content: content,
      user_id: user_id,
      post_id: post_id,
    };

    try {
      const result = await post.create({
        data: insert,
      });
      return new Message(['Post created', result], true);
    } catch (error) {
      return new Message(error, false);
    }
  }

  async find_by_post_id(id) {
    try {
      const db_post = await post.findUnique({
        where: {
          post_id: id,
        },
      });
      if (!db_post) {
        return new Message('Post not found', false);
      }
      return new Message(db_post, true);
    } catch (error) {
      return new Message(error, false);
    }
  }

  static async find_user_posts(id) {
    try {
      const db_post = await post.findMany({
        where: {
          user_id: id,
        },
      });
      if (db_post.length == 0) {
        return new Message('Posts not found', false);
      }
      return new Message(db_post, true);
    } catch (error) {
      return new Message(error, false);
    }
  }

  async delete_post(post_id, user_id) {
    try {
      const delete_post = await post.delete({
        where: {
          post_id: post_id,
          user_id: user_id,
        },
      });
      return new Message(['Post Deleted', delete_post], true);
    } catch (error) {
      return new Message(error, false);
    }
  }
}

export default PostService;
