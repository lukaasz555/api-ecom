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

const { getOrders } = require('../controllers/orders/getOrders');
const {
	getOrdersByCustomerId,
} = require('../controllers/orders/getOrdersByCustomerId');
const { getSalesData } = require('../controllers/orders/getSalesData');

router.route('/sales').get(getSalesData);
router.route('/:customerId').get(getOrdersByCustomerId);
router.route('/').get(getOrders);

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
