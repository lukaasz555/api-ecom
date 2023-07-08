import express from 'express';
const { putUser } = require('../controllers/user/putUser');
const { changePassword } = require('../controllers/user/changePassword');
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/').put(authMiddleware, putUser);
router.route('/password').put(authMiddleware, changePassword);

export default router;
