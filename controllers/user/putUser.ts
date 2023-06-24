import { Response } from 'express';
import { UserAuthenticatedReq } from '../../interfaces/UserAuthenticatedReq';
import { User } from '../../models/User';
import { HydratedDocument } from 'mongoose';
import jwt from 'jsonwebtoken';
import { validatePassword, getHashedPassword } from '../../helpers/bcryptAuth';
const UserSchema = require('../../schemas/UserSchema');
const dotenv = require('dotenv');

dotenv.config();

const TOKEN_SECRET: string = process.env.TOKEN_SECRET as string;

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

		const token = jwt.sign(
			{
				id: currentUser.id,
				_id: currentUser._id,
				name: currentUser.name,
				lastname: currentUser.lastname,
				email: currentUser.email,
				role: currentUser.role,
				orders: currentUser.orders,
			},
			TOKEN_SECRET
		);
		res.status(200).json(token);
	} else {
		res.status(403).json('Forbidden');
	}
};
