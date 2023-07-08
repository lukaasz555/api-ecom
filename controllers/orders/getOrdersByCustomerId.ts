import { Response } from 'express';
import { UserAuthenticatedReq } from '../../interfaces/UserAuthenticatedReq';
import { UserRolesEnum } from '../../enums/UserRolesEnum';
const Order = require('../../schemas/Order');

exports.getOrdersByCustomerId = async (
	req: UserAuthenticatedReq,
	res: Response
) => {
	// TAKE NOTE that there is a limit up to 10 orders - it's temporary
	if (req.user && req.user.role !== UserRolesEnum.Guest) {
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
	} else {
		res.status(403).json('Forbidden');
	}
};
