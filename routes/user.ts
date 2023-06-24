import express from 'express';
const { putUser } = require('../controllers/user/putUser');
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/').put(authMiddleware, putUser);

export default router;
