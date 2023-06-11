import { Request, Response, NextFunction } from 'express';
import { DbOrderModel } from '../../interfaces/OrderModel';
import { getMonthlyData } from '../../helpers/ChartData';
import moment = require('moment');
const Order = require('../../schemas/Order');

exports.getSalesData = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
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
};
