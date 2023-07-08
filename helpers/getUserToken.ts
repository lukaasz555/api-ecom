import jwt from 'jsonwebtoken';
import { User } from '../models/User';
const dotenv = require('dotenv');
dotenv.config();

const TOKEN_SECRET: string = process.env.TOKEN_SECRET as string;

export function getUserToken(user: User): string {
	const token = jwt.sign(
		{
			id: user.id,
			_id: user._id,
			name: user.name,
			lastname: user.lastname,
			email: user.email,
			role: user.role,
			orders: user.orders,
		},
		TOKEN_SECRET
	);
	return token;
}
