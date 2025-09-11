import { Router } from 'express';
import { getLogin, postLogin, postLogout, postRegister } from '../controllers/authController.js';
import { ensureNotAuth } from '../middleware/auth.js';
import { validateLogin, validateRegister } from '../middleware/validate.js';

const router = Router();

router.get('/login', ensureNotAuth, getLogin);
// router.get('/register', ensureNotAuth, getRegister);
router.post('/login', validateLogin, postLogin);
router.post('/register', validateRegister, postRegister);
router.get('/logout', postLogout);

export default router;
