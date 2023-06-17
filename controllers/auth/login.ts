import { Request, Response, NextFunction } from 'express';
import { User } from '../../models/User';
const UserSchema = require('../../schemas/UserSchema');
import { HydratedDocument } from 'mongoose';
import { validatePassword } from '../../helpers/bcryptAuth';

exports.login = async (req: Request, res: Response, next: NextFunction) => {
	const currentUser: HydratedDocument<User> = await UserSchema.findOne({
		email: req.body.email,
	});
	if (currentUser) {
		const isValidPassword = await validatePassword(
			req.body.password,
			currentUser.password
		);
		if (isValidPassword) {
			res.status(200).json(currentUser);
		} else {
			res.status(401).json('Wrong credentials');
		}
	} else {
		res.status(404).json('No such a user exists');
	}
};
