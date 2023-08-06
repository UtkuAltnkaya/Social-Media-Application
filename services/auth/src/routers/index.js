import { Router } from 'express';

import { register } from '../controllers/register.js';
import { login } from '../controllers/login.js';
import { logout } from '../controllers/logout.js';
import { validate_login } from '../middleware/login.js';
import { validate_register } from '../middleware/register.js';

const router = Router();

router.post('/register', validate_register, register);
router.post('/login', validate_login, login);
router.post('/logout', logout);

export { router };
