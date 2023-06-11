import { Request, Response, NextFunction } from 'express';
import { OrderModel } from '../../interfaces/OrderModel';
import { HydratedDocument } from 'mongoose';
const Order = require('../../schemas/Order');

exports.getOrders = async (req: Request, res: Response, next: NextFunction) => {
	console.log(req.query);
	const { page, limit } = req.query;
	if (page && limit) {
		try {
			const count = await Order.count();
			const orders: HydratedDocument<OrderModel> = await Order.find()
				.sort({
					createdAt: 'desc',
				})
				.limit(+limit)
				.skip((+page - 1) * +limit)
				.exec();

			return res.status(200).json({
				items: orders,
				totalPages: Math.ceil(count / +limit),
				currentPage: page,
			});
		} catch (err) {
			console.log(err);
		}
	} else {
		return res.status(500).json('Server error');
	}
};
