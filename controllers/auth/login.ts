import { Request, Response, NextFunction } from 'express';
import { User } from '../../models/User';
const UserSchema = require('../../schemas/UserSchema');
import { HydratedDocument } from 'mongoose';

exports.login = async (req: Request, res: Response, next: NextFunction) => {
	const currentUser: HydratedDocument<User> = await UserSchema.findOne({
		email: req.body.email,
	});
	if (currentUser) {
		if (currentUser.password === req.body.password) {
			res.status(200).json(currentUser);
		} else {
			res.status(401).json('Wrong credentials');
		}
	} else {
		res.status(404).json('No such a user exists');
	}
};
