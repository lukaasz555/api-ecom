import express from 'express';
const { register } = require('../controllers/auth/register');
const { login } = require('../controllers/auth/login');

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);

export default router;
