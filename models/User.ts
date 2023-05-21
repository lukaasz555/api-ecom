import { DbOrderModel } from '../interfaces/OrderModel';

export class User {
	id = '';
	email = '';
	password = '';
	orders: DbOrderModel[] = [];
	name = '';
	lastname = '';

	constructor(user: User) {
		this.id = user.id;
		this.email = user.email;
		this.password = user.password;
		this.orders = user.orders;
		this.name = user.name;
		this.lastname = user.lastname;
	}
}
