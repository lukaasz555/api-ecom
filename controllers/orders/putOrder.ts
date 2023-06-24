import { Response } from 'express';
import { UserAuthenticatedReq } from '../../interfaces/UserAuthenticatedReq';
import { OrderModel } from '../../interfaces/OrderModel';
import { UserRolesEnum } from '../../enums/UserRolesEnum';
const Order = require('../../schemas/Order');

exports.putOrder = async (req: UserAuthenticatedReq, res: Response) => {
	if (req.user && req.user.role === UserRolesEnum.Admin) {
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
	} else {
		res.status(403).json('Forbidden');
	}
};
