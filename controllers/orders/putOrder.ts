import { Request, Response } from 'express';
import { OrderModel } from '../../interfaces/OrderModel';
const Order = require('../../schemas/Order');

exports.putOrder = async (req: Request, res: Response) => {
	try {
		const order: OrderModel = await Order.findByIdAndUpdate(req.body.id, {
			$set: {
				status: req.body.status,
			},
		});
		res.status(200).json(order);
	} catch (err) {
		console.log(err);
	}
};
