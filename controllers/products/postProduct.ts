import { Request, Response, NextFunction } from 'express';
import { HydratedDocument } from 'mongoose';
import { ProductModel } from '../../interfaces/ProductModel';
const Product = require('../../schemas/Product');

exports.postProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
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
};
