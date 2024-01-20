import { atom } from 'recoil';

export const orderItemState = atom({
	key: `orderItemState`,
	default: [
		{
			id: '',
			name: '',
			event: 0,
			materialType: 0,
			price: 0,
		},
	],
});

export const orderListState = atom({
	key: `orderListState`,
	default: [
		{
			id: '',
			count: 0,
			totalPrice: 0,
		},
	],
});

export const orderSelectedState = atom({
	key: `orderSelectedState`,
	default: false,
});
