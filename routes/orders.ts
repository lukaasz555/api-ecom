import express from 'express';
const { getOrders } = require('../controllers/orders/getOrders');
const {
	getOrdersByCustomerId,
} = require('../controllers/orders/getOrdersByCustomerId');
const { getSalesData } = require('../controllers/orders/getSalesData');
const { postOrder } = require('../controllers/orders/postOrder');
const { putOrder } = require('../controllers/orders/putOrder');

const router = express.Router();

router.route('/sales').get(getSalesData);
router.route('/:customerId').get(getOrdersByCustomerId);
router.route('/').put(putOrder);
router.route('/').post(postOrder);
router.route('/').get(getOrders);

export default router;
