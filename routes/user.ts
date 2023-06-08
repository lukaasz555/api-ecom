import express, { Request, Response } from 'express';
import { User } from '../models/User';
import { HydratedDocument } from 'mongoose';
const UserSchema = require('../schemas/UserSchema');

const router = express.Router();

router.put('/', async (req: Request, res: Response) => {
	try {
		const user: HydratedDocument<User> = await UserSchema.findByIdAndUpdate(
			req.body.user._id,
			{ $set: req.body.user },
			{ new: true }
		);
		res.status(200).json(user);
	} catch (e) {
		console.log(e);
	}
});

export default router;
