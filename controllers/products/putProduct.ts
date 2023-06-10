import { Request, Response, NextFunction } from 'express';
import { HydratedDocument } from 'mongoose';
import { ProductModel } from '../../interfaces/ProductModel';
const Product = require('../../schemas/Product');

exports.putProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
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
		res.status(401).json('Wrong credentials');
	}
};
