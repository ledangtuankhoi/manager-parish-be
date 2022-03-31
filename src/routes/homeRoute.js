import { Router } from 'express';
const router = Router();
import { index } from '../app/controllers/homeController.js';

router.get('/', index)

export default router