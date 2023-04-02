import { Document } from 'mongoose';
import { OrderModel } from './OrderModel';

export interface CustomerModel {
	customerName: string;
	customerEmail: string;
	newsletterConsent: boolean;
	orders?: Array<OrderModel>;
}
