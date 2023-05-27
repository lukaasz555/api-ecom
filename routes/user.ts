import express, { Request, Response } from 'express';
import { User } from '../models/User';
import { HydratedDocument } from 'mongoose';
const UserSchema = require('../schemas/UserSchema');

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
	const currentUser: HydratedDocument<User> = await UserSchema.findOne({
		email: req.body.email,
	});

	if (currentUser) {
		res.status(409).json('User with this email already exists');
	} else {
		const usersCount = await UserSchema.count();
		const user: User = new User({
			...req.body,
			id: usersCount + 1,
		});
		console.log(user);
		const newUser: HydratedDocument<User> = new UserSchema(user);
		try {
			newUser.save().then((x) => res.status(200).json(x));
		} catch (e) {
			console.log(e);
		}
	}
});

router.post('/login', async (req: Request, res: Response) => {
	const currentUser: HydratedDocument<User> = await UserSchema.findOne({
		email: req.body.email,
	});
	if (currentUser) {
		if (currentUser.password === req.body.password) {
			console.log('dane ok');
			res.status(200).json(currentUser);
		} else {
			res.status(401).json('Wrong credentials');
		}
	} else {
		res.status(404).json('No such a user exists');
	}
});

export default router;
