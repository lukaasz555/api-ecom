import express, { Request, Response } from 'express';
import { User } from '../models/User';
import { HydratedDocument } from 'mongoose';
const UserSchema = require('../schemas/UserSchema');

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
	try {
		res.status(200).json('ok');
	} catch (e) {
		console.log(e);
	}
});

export default router;
