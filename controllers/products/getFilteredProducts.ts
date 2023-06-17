import { Request, Response, NextFunction } from 'express';
const Product = require('../../schemas/Product');
import { ProductModel } from '../../interfaces/ProductModel';

exports.getFilteredProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
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
};
