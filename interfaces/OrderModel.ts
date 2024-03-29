import { ProductModel } from './ProductModel';

export interface OrderModel {
	items: ProductModel[];
	qty: number;
	value: number;
	ship: {
		inpost: string;
		cost: number;
	};
}

export interface DbOrderModel extends OrderModel {
	createdAt: Date;
	updatedAt: Date;
}
