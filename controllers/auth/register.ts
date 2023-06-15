import { Request, Response, NextFunction } from 'express';
import { User } from '../../models/User';
const UserSchema = require('../../schemas/UserSchema');
import { HydratedDocument } from 'mongoose';
import { getHashedPassword } from '../../helpers/bcryptAuth';

exports.register = async (req: Request, res: Response, next: NextFunction) => {
	const currentUser: HydratedDocument<User> = await UserSchema.findOne({
		email: req.body.email,
	});

	if (currentUser) {
		res.status(409).json('User with this email already exists');
	} else {
		const hashedPassword = await getHashedPassword(req.body.password);
		const usersCount = await UserSchema.count();
		const user: User = new User({
			...req.body,
			id: usersCount + 1,
			password: hashedPassword,
		});

		const newUser: HydratedDocument<User> = new UserSchema(user);
		try {
			newUser.save().then((x) => res.status(200).json(x));
		} catch (e) {
			console.log(e);
			res.status(500).json('Server error');
		}
	}
};
