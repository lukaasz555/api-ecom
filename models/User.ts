import { DbOrderModel } from '../interfaces/OrderModel';
import { UserRolesEnum } from '../enums/UserRolesEnum';

export class User {
	id = '';
	_id?: string;
	email = '';
	password = '';
	orders: DbOrderModel[] = [];
	name = '';
	lastname = '';
	role: UserRolesEnum;

	constructor(user: User) {
		this.id = user.id;
		this.email = user.email;
		this.password = user.password;
		this.orders = user.orders;
		this.name = user.name;
		this.lastname = user.lastname;
		this.role = user.role;
	}
}
