import express, { Request, Response } from 'express';
const router = express.Router();
const Product = require('../models/Product');
import { HydratedDocument } from 'mongoose';
import { ProductModel } from '../interfaces/ProductModel';

// get products:
router.get('/', async (req: Request, res: Response) => {
	const { page, limit } = JSON.parse(JSON.stringify(req.query.query));
	if (page > 0 && limit > 0) {
		try {
			const count: number = await Product.count();
			const products: HydratedDocument<ProductModel> = await Product.find()
				.limit(Number(limit))
				.skip((Number(page) - 1) * Number(limit))
				.exec();

			res.status(200).json({
				items: products,
				totalPages: Math.ceil(count / Number(limit)),
				currentPage: page,
			});
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

// get product by id:
router.get('/:id', async (req: Request, res: Response) => {
	try {
		const prod: ProductModel = await Product.findOne({
			id: req.params.id,
		});
		if (prod !== null) {
			res.send(prod);
		} else {
			res.status(204).json("Product doesn't exist");
		}
	} catch (err) {
		console.log(err);
	}
});

// edit product:
router.put('/:id', async (req: Request, res: Response) => {
	if (req.body.password === process.env.PASS) {
		try {
			const filter = { id: req.params.id };
			const updated = await Product.findOneAndUpdate(filter, {
				$set: {
					price: req.body.price,
					discount: req.body.discount,
					title: req.body.title,
					authors: req.body.authors,
					description: req.body.description,
				},
			}).then((res: Response) => {
				console.log(res);
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
		res.status(200).json('success');
	} catch (err) {
		console.log(err);
	}
});

// remove product:
router.delete('/:id', async (req: Request, res: Response) => {
	if (req.body.password === process.env.PASS) {
		try {
			const product = await Product.findOne({
				id: req.params.id,
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

// search result:
router.get('/search', async (req: Request, res: Response) => {
	const { key, value } = JSON.parse(JSON.stringify(req.query.params));
	try {
		const products: ProductModel[] = await Product.find({
			[key]: value,
		});
		if (products.length > 0) {
			// console.log(products.map((x) => x.title));
			res.status(200).json(products);
		} else if (products.length === 0) {
			res.status(204).json('no products');
		}
	} catch (err) {
		console.log(err);
	}
});

export default router;
