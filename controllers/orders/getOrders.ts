import { Response } from 'express';
import { UserAuthenticatedReq } from '../../interfaces/UserAuthenticatedReq';
import { OrderModel } from '../../interfaces/OrderModel';
import { HydratedDocument } from 'mongoose';
import { UserRolesEnum } from '../../enums/UserRolesEnum';
const Order = require('../../schemas/Order');

exports.getOrders = async (req: UserAuthenticatedReq, res: Response) => {
	const { page, limit } = req.query;
	if (page && limit && req.user && req.user.role === UserRolesEnum.Admin) {
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
	} else if (req.user && req.user.role !== UserRolesEnum.Admin) {
		res.status(403).json('Forbidden');
	} else {
		return res.status(500).json('Server error');
	}
};
