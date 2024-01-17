interface OrderItemProps {
	id: string;
	name: string;
	event: number;
	materialType: number;
	price: number;
}

function OrderItem({ id, name, event, materialType, price }: OrderItemProps) {
	//TODO: Styling
	return (
		<div>
			<div>{name}</div>
			<div>{event}</div>
			<div>{materialType}</div>
			<div>{price}</div>
		</div>
	);
}

export default OrderItem;
