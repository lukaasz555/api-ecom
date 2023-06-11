import { Request, Response, NextFunction } from 'express';
const Order = require('../../schemas/Order');

exports.getOrdersByCustomerId = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// TAKE NOTE that there is a limit up to 10 orders - it's temporary
	try {
		const orders = await Order.find({
			'customer.customerId': req.params.customerId,
		})
			.limit(10)
			.sort({ createdAt: 'desc' });
		res.status(200).json(orders);
	} catch (e) {
		res.status(500).json('Server error');
	}
};
