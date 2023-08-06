import { Router } from 'express';
import PostController from './controller.js';
import { validate_comment_id, validate_post, validate_post_id, validate_user_id } from './middleware/validate.js';
import { get_login_user } from './middleware/token.js';

const router = Router();
const controller = new PostController();

router.post('/create', [get_login_user, validate_post], controller.create_post);
router.get('/get_post', validate_post_id, controller.get_post);
router.get('/get_comments', [validate_post_id], controller.get_comments);
router.get('/get_one_comment', [validate_post_id, validate_comment_id], controller.get_one_comment);
router.delete('/delete_post', [get_login_user, validate_post_id], controller.delete_post);

export default router;
