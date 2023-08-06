import CommentController from './controller.js';

import { Router } from 'express';
import { get_login_user } from './middleware/token.js';
import { validate_comment, validate_comment_id } from './middleware/validate.js';

const router = Router();

router.post('/create', [get_login_user, validate_comment], CommentController.create_comment);
router.delete('/delete', [get_login_user, validate_comment_id], CommentController.delete_comment);

export default router;
