import express, { Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { ContactMessage } from '../schemas/ContactMessage';
import { ContactMessageModel } from '../interfaces/ContactMessageModel';

const router = express.Router();

// just temporary
router.post('/', async (req: Request, res: Response) => {
	const msg: HydratedDocument<ContactMessageModel> = new ContactMessage(
		req.body
	);
	try {
		await msg.save();
		res.status(200).json(msg);
	} catch (e) {
		console.log(e);
		res.status(502).json('Server error');
	}
});

export default router;
