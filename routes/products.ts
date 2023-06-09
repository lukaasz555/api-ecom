import express, { Request, Response } from 'express';
const router = express.Router();
const Product = require('../schemas/Product');
const {
	getProducts,
	findProductById,
} = require('../controllers/products/findProductById');
import { HydratedDocument, mongo } from 'mongoose';
import { ProductModel } from '../interfaces/ProductModel';
import mongoose from 'mongoose';

router.route('/').get(getProducts);
router.route('/:id').get(findProductById);

// get products:
// router.get('/', async (req: Request, res: Response) => {
// 	const { page, limit } = req.query;
// 	if (page && limit) {
// 		try {
// 			const count: number = await Product.count();
// 			const products: HydratedDocument<ProductModel> = await Product.find()
// 				.limit(Number(limit))
// 				.skip((Number(page) - 1) * Number(limit))
// 				.exec();

// 			res.status(200).json({
// 				items: products,
// 				totalPages: Math.ceil(count / Number(limit)),
// 				currentPage: page,
// 			});
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	}
// });

// search result:
router.get('/search', async (req: Request, res: Response) => {
	const { key, value, type = '', searchPhrase } = req.query;
	if (!key && type === 'text' && searchPhrase) {
		const collection = mongoose.connection.collection('products');
		const searchResults = await collection
			.aggregate([
				{
					$search: {
						index: 'products',
						compound: {
							should: [
								{
									autocomplete: {
										query: `${searchPhrase}`,
										path: 'title',
										fuzzy: {
											maxEdits: 2,
											prefixLength: 3,
										},
									},
								},
								{
									autocomplete: {
										query: `${searchPhrase}`,
										path: 'authors',
										fuzzy: {
											maxEdits: 2,
											prefixLength: 3,
										},
									},
								},
							],
						},
					},
				},
			])
			.toArray();
		res.status(200).json(searchResults);
	} else {
		try {
			const products: ProductModel[] = await Product.find({
				[String(key)]: value,
			});
			if (products.length > 0) {
				res.status(200).json(products);
			} else if (products.length === 0) {
				res.status(204).json('no products');
			}
		} catch (err) {
			console.log(err);
		}
	}
});

// categories:
router.get('/categories', async (req: Request, res: Response) => {
	try {
		const products: ProductModel[] = await Product.find({
			type: req.query.category,
		});
		const categoryIDs = [
			...new Set(products.map((x) => x.categoryID)),
			99,
		].sort();
		res.status(200).json(categoryIDs);
	} catch (e) {
		console.log(e);
	}
});

// get exact type & category:
router.get('/:category/:id', async (req: Request, res: Response) => {
	const { page = 1, limit = 10, catID = 99 } = req.query;
	if (req.query.catID && +req.query.catID === 99) {
		try {
			const products: ProductModel[] = await Product.find({
				type: req.params.category,
				discount: { $gte: 1 },
			})
				.limit(+limit)
				.skip((+page - 1) * +limit)
				.exec();
			const count: number = await Product.find({
				type: req.params.category,
				discount: { $gte: 1 },
			}).count();

			return res.status(200).json({
				items: products,
				totalPages: Math.ceil(count / +limit),
				currentPage: +page,
			});
		} catch (e) {
			console.log(e);
		}
	} else {
		try {
			const products: ProductModel[] = await Product.find({
				type: req.params.category,
				categoryID: +catID,
			})
				.limit(+limit)
				.skip((+page - 1) * +limit)
				.exec();

			const count: number = await Product.find({
				type: req.params.category,
				categoryID: +catID,
			}).count();

			return res.status(200).json({
				items: products,
				totalPages: Math.ceil(count / +limit),
				currentPage: +page,
			});
		} catch (err) {
			console.log(err);
		}
	}
});

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
