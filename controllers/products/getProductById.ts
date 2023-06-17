import { Request, Response, NextFunction } from 'express';
const Product = require('../../schemas/Product');
import { ProductModel } from '../../interfaces/ProductModel';

exports.getProductById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const product: ProductModel = await Product.findOne({ id: req.params.id });

	if (!product) {
		// 204 -> 404 later
		return res.status(204).json('Not found');
	}

	if (product) {
		return res.status(200).json(product);
	}
};
