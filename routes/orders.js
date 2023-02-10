const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const { v4: uuidv4 } = require('uuid');

// GET ALL ORDERS:
router.get('/', async (req, res) => {
	try {
		const orders = await Order.find();
		res.status(200).json(orders);
	} catch (err) {
		console.log(err);
	}
});

// NEW ORDER:
router.post('/new', async (req, res) => {
	const newOrder = {
		status: 'new',
		...req.body,
	};
	const orderModel = new Order(newOrder);

	try {
		orderModel.save((err, newOrder) => {
			if (err) {
				console.log(err);
			} else {
				res.status(200).json(orderModel);
			}
		});
	} catch (err) {
		console.log(err);
	}

	const customer = {
		customerName:
			req.body.customer.customerData.name +
			' ' +
			req.body.customer.customerData.lastname,
		customerEmail: req.body.customer.contact.email,
		newsletterConsent: req.body.customer.contact.newsletter,
		orders: req.body.order,
	};

	const customerModel = new Customer(customer);
	const newCustomer = await customerModel.save((err, res) => {
		if (err) {
			console.log(err);
		}
	});
});

// UPDATE STATUS:
router.put('/:id', async (req, res) => {
	try {
		const order = await Order.findByIdAndUpdate(req.body.id, {
			$set: {
				status: req.body.status,
			},
		});
		res.send(order);
	} catch (err) {
		console.log(err);
	}
});
module.exports = router;
