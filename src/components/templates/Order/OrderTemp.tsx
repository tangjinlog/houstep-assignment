import { OrderListItemFetcher } from '@organisms/Fetcher';
import { OrderListContainer } from '@organisms/Container';
import OrderModal from '@organisms/OrderModal';

export interface OrderContainerPropsType {
	isFetching: boolean;
	innerRef: React.RefObject<HTMLDivElement>;
}
function OrderTemp() {
	return (
		//TODO: apiBoundary
		<>
			<OrderListItemFetcher>
				{(props: OrderContainerPropsType) => <OrderListContainer {...props} />}
			</OrderListItemFetcher>
			<OrderModal />
		</>
	);
}

export default OrderTemp;
