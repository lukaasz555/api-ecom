import express from 'express';
const { getProductById } = require('../controllers/products/getProductById');
const { getProducts } = require('../controllers/products/getProducts');
const { getCategories } = require('../controllers/products/getCategories');
const {
	getSearchResults,
} = require('../controllers/products/getSearchResults');
const {
	getFilteredProducts,
} = require('../controllers/products/getFilteredProducts');
const { postProduct } = require('../controllers/products/postProduct');
const { putProduct } = require('../controllers/products/putProduct');
const { deleteProduct } = require('../controllers/products/deleteProduct');

const router = express.Router();

router.route('/:category/:id').get(getFilteredProducts);
router.route('/categories').get(getCategories);
router.route('/search').get(getSearchResults);
router.route('/:id').get(getProductById);
router.route('/').post(postProduct);
router.route('/').delete(deleteProduct);
router.route('/').put(putProduct);
router.route('/').get(getProducts);

export default router;
