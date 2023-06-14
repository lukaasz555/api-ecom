import { Request, Response } from 'express';
import { User } from '../../models/User';
import { HydratedDocument } from 'mongoose';
const UserSchema = require('../../schemas/UserSchema');

exports.putUser = async (req: Request, res: Response) => {
	const currentUser: HydratedDocument<User> = await UserSchema.findOne({
		email: req.body.user.email,
	});

	if (currentUser.password === req.body.user.password) {
		const updatedUser = await UserSchema.findOneAndUpdate(
			{ email: req.body.user.email },
			{ $set: req.body.user },
			{ new: true }
		);
		res.status(200).json(updatedUser);
	} else {
		res.status(401).json('Wrong credentials');
	}
};
