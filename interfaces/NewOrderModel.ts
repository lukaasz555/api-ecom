import { OrderModel } from './OrderModel';
import { ProductModel } from './ProductModel';

export interface NewOrder {
	status: string;
	customer: {
		customerId: string;
		customerData: {
			name: string;
			lastname: string;
			nip?: string;
			companyName?: string;
		};
		contact: {
			email: string;
			phoneNumber: string;
		};
		address: {
			address1: string;
			address2?: string;
			postalCode: string;
			city: string;
			country: string;
		};
	};
	order: {
		items: ProductModel[];
		qty: number;
		value: number;
		ship: {
			inpost: string;
			cost: number;
		};
	};
}
