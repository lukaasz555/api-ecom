import express, { Application, Request, Response } from 'express';
const router = express.Router();
const Order = require('../schemas/Order');
import { Customer } from '../schemas/Customer';
const { v4: uuidv4 } = require('uuid');
import { NewOrder } from '../interfaces/NewOrderModel';
import { CustomerModel } from '../interfaces/CustomerModel';
import { OrderModel, DbOrderModel } from '../interfaces/OrderModel';
import { HydratedDocument } from 'mongoose';
import moment from 'moment';
import { getMonthlyData } from '../helpers/ChartData';

// GET ORDERS:
router.get('/', async (req: Request, res: Response) => {
	const { page, limit } = JSON.parse(JSON.stringify(req.query.query));
	if (page > 0 && limit > 0) {
		try {
			const count: number = await Order.count();
			const orders: HydratedDocument<OrderModel> = await Order.find()
				.sort({
					createdAt: 'desc',
				})
				.limit(Number(limit))
				.skip((Number(page) - 1) * Number(limit))
				.exec();

			res.status(200).json({
				items: orders,
				totalPages: Math.ceil(count / Number(limit)),
				currentPage: page,
			});
		} catch (err) {
			console.log(err);
		}
	}
});

router.get('/sales', async (req: Request, res: Response) => {
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
});

// NEW ORDER:
router.post('/', async (req: Request, res: Response) => {
	const newOrder: NewOrder = {
		status: 'new',
		...req.body,
	};
	const orderModel: HydratedDocument<OrderModel> = new Order(newOrder);

	try {
		orderModel.save((err) => {
			if (err) {
				console.log(err);
			} else {
				res.status(200).json(orderModel);
			}
		});
	} catch (err) {
		console.log(err);
	}

	const customer: CustomerModel = {
		customerName:
			req.body.customer.customerData.name +
			' ' +
			req.body.customer.customerData.lastname,
		customerEmail: req.body.customer.contact.email,
		newsletterConsent: req.body.customer.contact.newsletter,
		orders: req.body.order,
	};

	const customerModel: HydratedDocument<CustomerModel> = new Customer(customer);
	const newCustomer = customerModel.save((err) => {
		if (err) {
			console.log(err);
		}
	});
});

// UPDATE STATUS:
router.put('/', async (req: Request, res: Response) => {
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
});

export default router;
