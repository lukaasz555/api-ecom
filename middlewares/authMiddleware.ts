import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import { UserAuthenticatedReq } from '../interfaces/UserAuthenticatedReq';
const dotenv = require('dotenv');
dotenv.config();

const TOKEN = process.env.TOKEN_SECRET as string;

export function authMiddleware(
	req: UserAuthenticatedReq,
	res: Response,
	next: NextFunction
) {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) {
		console.log('!token');
		res.status(401).json('Unauthorized');
	} else {
		try {
			const decodedUser = jwt.verify(token, TOKEN) as User;
			req.user = decodedUser;
			next();
		} catch (e) {
			res.status(500).json('Server error');
		}
	}
}
