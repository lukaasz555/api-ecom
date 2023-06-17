import { Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { OrderModel } from '../../interfaces/OrderModel';
import { CustomerModel } from '../../interfaces/CustomerModel';
import { NewOrder } from '../../interfaces/NewOrderModel';
import { OrderStatusesEnum } from '../../enums/OrderStatusesEnum';
const Customer = require('../../schemas/Customer');
const Order = require('../../schemas/Order');

exports.postOrder = async (req: Request, res: Response) => {
	const newOrder: NewOrder = {
		status: OrderStatusesEnum.New,
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
};
