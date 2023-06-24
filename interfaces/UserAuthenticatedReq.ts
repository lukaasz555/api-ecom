import { Request } from 'express';
import { User } from '../models/User';

export interface UserAuthenticatedReq extends Request {
	user?: User;
}
