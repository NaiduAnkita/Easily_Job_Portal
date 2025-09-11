import { Router } from 'express';
import { landing } from '../controllers/controllers/jobController.js';

const router = Router();

router.get('/', landing);

export default router;
