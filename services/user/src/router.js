import { Router } from 'express';

import {
  follow,
  get_all_followers,
  get_user_by_id,
  get_user_by_username,
  get_user_comments,
  get_user_posts,
  unfollow,
  is_follows,
} from './controller.js';
import { validate_id, validate_username } from './middleware/validation.js';
import { get_login_user } from './middleware/token.js';

const router = Router();

router.get('/get_id', validate_id, get_user_by_id);
router.get('/get_username', validate_username, get_user_by_username);
router.get('/get_login_user', get_user_by_username);
router.get('/get_posts', validate_id, get_user_posts);
router.get('/get_comments', validate_id, get_user_comments);
router.post('/follow', [get_login_user, validate_id], follow);
router.post('/unfollow', [get_login_user, validate_id], unfollow);
router.get('/get_all_followers', validate_id, get_all_followers);
router.get('/is_follows', [get_login_user, validate_id], is_follows);

export default router;
