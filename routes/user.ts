import express from 'express';
const { putUser } = require('../controllers/user/putUser');

const router = express.Router();

router.route('/').put(putUser);

export default router;
