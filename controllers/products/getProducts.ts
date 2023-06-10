import { Request, Response, NextFunction } from 'express';
import { HydratedDocument } from 'mongoose';
const Product = require('../../schemas/Product');
import { ProductModel } from '../../interfaces/ProductModel';

exports.getProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { page, limit } = req.query;

	if (page && limit) {
		try {
			const count = await Product.count();
			const products: HydratedDocument<ProductModel> = await Product.find()
				.limit(+limit)
				.skip((+page - 1) * +limit)
				.exec();

			return res.status(200).json({
				items: products,
				totalPages: Math.ceil(count / +limit),
				currentPage: page,
			});
		} catch (e) {
			console.log(e);
		}
	}
};
