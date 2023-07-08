import { Response } from 'express';
import { UserAuthenticatedReq } from '../../interfaces/UserAuthenticatedReq';
import { User } from '../../models/User';
import { HydratedDocument } from 'mongoose';
import jwt from 'jsonwebtoken';
import { validatePassword, getHashedPassword } from '../../helpers/bcryptAuth';
import { getUserToken } from '../../helpers/getUserToken';
const UserSchema = require('../../schemas/UserSchema');

exports.changePassword = async (req: UserAuthenticatedReq, res: Response) => {
	const currentUser: HydratedDocument<User> = await UserSchema.findOne({
		email: req.body.email,
	});

	const isPasswordValid = await validatePassword(
		req.body.password,
		currentUser.password
	);

	if (isPasswordValid) {
		const hashedPassword = await getHashedPassword(req.body.newPassword);
		const updatedUser = await UserSchema.findOneAndUpdate(
			{ email: req.body.email },
			{
				$set: {
					password: hashedPassword,
				},
			},
			{ new: true }
		);

		const token = getUserToken(currentUser);
		res.status(200).json(token);
	} else {
		res.status(403).json('Forbidden');
	}
};
