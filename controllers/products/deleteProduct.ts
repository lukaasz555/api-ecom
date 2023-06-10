import { Request, Response, NextFunction } from 'express';
import { ProductModel } from '../../interfaces/ProductModel';
const Product = require('../../schemas/Product');

exports.deleteProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.body.password === process.env.PASS) {
		try {
			const product: ProductModel = await Product.findOne({
				id: req.body.id,
			})
				.deleteOne()
				.exec();
			return res.status(200).json('Removed product');
		} catch (err) {
			console.log(err);
		}
	} else {
		return res.status(401).json('Wrong credentials');
	}
};
