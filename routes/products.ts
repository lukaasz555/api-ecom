import express, { Request, Response } from 'express';
import { HydratedDocument, mongo } from 'mongoose';
import { ProductModel } from '../interfaces/ProductModel';
import mongoose from 'mongoose';
const Product = require('../schemas/Product');
const { getProductById } = require('../controllers/products/getProductById');
const { getProducts } = require('../controllers/products/getProducts');
const { getCategories } = require('../controllers/products/getCategories');
const {
	getSearchResults,
} = require('../controllers/products/getSearchResults');
const {
	getFilteredProducts,
} = require('../controllers/products/getFilteredProducts');

const router = express.Router();
router.route('/:category/:id').get(getFilteredProducts);
router.route('/categories').get(getCategories);
router.route('/search').get(getSearchResults);
router.route('/:id').get(getProductById);
router.route('/').get(getProducts);

// edit product:
router.put('/', async (req: Request, res: Response) => {
	if (req.body.password === process.env.PASS) {
		try {
			const filter = { id: req.body.id };
			const updated = await Product.findOneAndUpdate(filter, {
				$set: {
					price: req.body.price,
					discount: req.body.discount,
					title: req.body.title,
					authors: req.body.authors,
					description: req.body.description,
				},
			});
			res.status(200).json(updated);
		} catch (err) {
			console.log(err);
		}
	} else {
		res.status(401).json('wrong credentials');
	}
});

// add product:
router.post('/', async (req: Request, res: Response) => {
	try {
		const product: HydratedDocument<ProductModel> = new Product({
			id: req.body.id,
			title: req.body.title,
			authors: req.body.authors,
			releaseYear: req.body.releaseYear,
			description: req.body.description,
			img: req.body.img,
			price: req.body.price,
			discount: req.body.discount,
			categoryID: req.body.categoryID,
			format: req.body.format,
			type: req.body.type,
			pages: req.body.pages,
			language: req.body.language,
			label: req.body.label,
			publisher: req.body.publisher,
		});
		await product.save();
		res.status(200).json(product);
	} catch (err) {
		console.log(err);
	}
});

// remove product:
router.delete('/', async (req: Request, res: Response) => {
	if (req.body.password === process.env.PASS) {
		try {
			const product = await Product.findOne({
				id: req.body.id,
			})
				.deleteOne()
				.exec();
			res.status(200).json('Usunięto produkt');
		} catch (err) {
			console.log(err);
		}
	} else {
		res.status(401).json('wrong credentials');
	}
});

export default router;
