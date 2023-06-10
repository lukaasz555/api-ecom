import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { ProductModel } from '../../interfaces/ProductModel';
const Product = require('../../schemas/Product');

exports.getSearchResults = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
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
		return res.status(200).json(searchResults);
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
};
