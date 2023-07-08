import { Response } from 'express';
import { DbOrderModel } from '../../interfaces/OrderModel';
import { getMonthlyData } from '../../helpers/ChartData';
import { UserAuthenticatedReq } from '../../interfaces/UserAuthenticatedReq';
import { UserRolesEnum } from '../../enums/UserRolesEnum';
import moment from 'moment';
const Order = require('../../schemas/Order');

exports.getSalesData = async (req: UserAuthenticatedReq, res: Response) => {
	if (req.user && req.user.role === UserRolesEnum.Admin) {
		const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		const startMonth = Number(
			moment(new Date()).subtract(11, 'month').format('M')
		);

		const arr = months.splice(months[startMonth - 2]);
		const monthsOrder = arr.concat(months);

		const orders: DbOrderModel[] = await Order.find({
			createdAt: {
				$gte: moment(new Date()).subtract(11, 'month'),
			},
		});

		const chartData = monthsOrder.map((item) =>
			getMonthlyData(orders, String(item))
		);
		res.status(200).json(chartData);
	} else {
		res.status(403).json('Forbidden');
	}
};
