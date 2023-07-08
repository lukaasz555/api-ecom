import { Response } from 'express';
import { UserAuthenticatedReq } from '../../interfaces/UserAuthenticatedReq';
import { User } from '../../models/User';
import { HydratedDocument } from 'mongoose';
import { validatePassword, getHashedPassword } from '../../helpers/bcryptAuth';
import { getUserToken } from '../../helpers/getUserToken';
const UserSchema = require('../../schemas/UserSchema');

exports.putUser = async (req: UserAuthenticatedReq, res: Response) => {
	const currentUser: HydratedDocument<User> = await UserSchema.findOne({
		email: req.body.user.email,
	});

	const isPasswordValid = await validatePassword(
		req.body.user.password,
		currentUser.password
	);

	if (isPasswordValid) {
		const { password, ...toUpdate } = req.body.user;
		const updatedUser = await UserSchema.findOneAndUpdate(
			{ email: req.body.user.email },
			{ $set: toUpdate },
			{ new: true }
		);

		const token = getUserToken(updatedUser);
		res.status(200).json(token);
	} else {
		res.status(403).json('Forbidden');
	}
};
