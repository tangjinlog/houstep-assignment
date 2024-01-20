import api from 'queries/config';
import type { OrderTypes } from '@molecules/OrderCounter/OrderCounter';

const getItems = async (params: number) => {
	try {
		const res = await api.get(`/items`, { params: { _page: params } });
		return res.data;
	} catch (error) {
		throw error;
	}
};

const postOrder = async (orderList: OrderTypes[]) => {
	try {
		const res = await api.post(`/order`, { orderList });
		return res.data;
	} catch (error) {
		throw error;
	}
};

export const orderHandlers = {
	getItems,
	postOrder,
};
