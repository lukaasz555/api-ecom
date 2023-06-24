import { Request, Response, NextFunction } from 'express';
import { User } from '../../models/User';
const UserSchema = require('../../schemas/UserSchema');
import { HydratedDocument } from 'mongoose';
import { validatePassword } from '../../helpers/bcryptAuth';
import jwt from 'jsonwebtoken';
const dotenv = require('dotenv');

dotenv.config();
const TOKEN_SECRET: string = process.env.TOKEN_SECRET as string;

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
			res.status(401).json('Wrong credentials');
		}
	} else {
		res.status(404).json('No such a user exists');
	}
};
