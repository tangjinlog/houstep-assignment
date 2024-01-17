import api from 'queries/config';

const getItems = async (params: number) => {
	try {
		const res = await api.get(`/items`, { params: { _page: params } });
		return res.data;
	} catch (error) {
		throw error;
	}
};

export const orderHandlers = {
	getItems,
};
