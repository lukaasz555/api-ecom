import { OrderModel } from './OrderModel';

export interface NewOrder {
	status: string;
	customer: {
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
	order: OrderModel;
}
