import express from 'express';
const { getOrders } = require('../controllers/orders/getOrders');
const {
	getOrdersByCustomerId,
} = require('../controllers/orders/getOrdersByCustomerId');
const { getSalesData } = require('../controllers/orders/getSalesData');
const { postOrder } = require('../controllers/orders/postOrder');
const { putOrder } = require('../controllers/orders/putOrder');
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/sales').get(authMiddleware, getSalesData);
router.route('/:customerId').get(authMiddleware, getOrdersByCustomerId);
router.route('/').put(authMiddleware, putOrder);
router.route('/').get(authMiddleware, getOrders);
router.route('/').post(postOrder);

export default router;
