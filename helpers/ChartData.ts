import moment from 'moment';
import { DbOrderModel, OrderModel } from '../interfaces/OrderModel';
import { ProductModel } from '../interfaces/ProductModel';

export function getMonthlyData(
	arr: DbOrderModel[],
	item: string
): Record<string, string | number> {
	const ordersArray = getOrdersByMonth(arr, item);

	return {
		name: handleMonthName(item),
		orders: ordersArray.length,
	};
}

function getOrdersByMonth(arr: DbOrderModel[], date: string): DbOrderModel[] {
	const orders = arr.filter(
		(item) => moment(item.createdAt).format('M') === date
	);
	return orders;
}

function handleMonthName(data: string) {
	switch (data) {
		case '1':
			return 'styczeń';
		case '2':
			return 'luty';
		case '3':
			return 'marzec';
		case '4':
			return 'kwiecień';
		case '5':
			return 'maj';
		case '6':
			return 'czerwiec';
		case '7':
			return 'lipiec';
		case '8':
			return 'sierpień';
		case '9':
			return 'wrzesień';
		case '10':
			return 'październik';
		case '11':
			return 'listopad';
		case '12':
			return 'grudzień';
		default:
			return '';
	}
}
