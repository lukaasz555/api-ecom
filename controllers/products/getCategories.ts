import { Request, Response, NextFunction } from 'express';
import { HydratedDocument } from 'mongoose';
const Product = require('../../schemas/Product');
import { ProductModel } from '../../interfaces/ProductModel';

exports.getCategories = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { category } = req.query;
	const products: ProductModel[] = await Product.find({ type: category });
	const categoriesIds = [
		...new Set(products.map((x) => x.categoryID)),
		99,
	].sort();
	return res.status(200).json(categoriesIds);
};
