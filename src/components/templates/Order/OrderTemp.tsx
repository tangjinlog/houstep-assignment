import { OrderListItemFetcher } from '@molecules/Fetcher/Fetcher';
import { OrderListContainer } from '@molecules/Container';
import OrderModal from '@organisms/OrderModal';

export interface OrderContainerPropsType {
	fetchNextPage: () => void;
	hasNextPage: boolean;
	isFetching: boolean;
}
function OrderTemp() {
	return (
		<>
			<OrderListItemFetcher>
				{(props: OrderContainerPropsType) => <OrderListContainer {...props} />}
			</OrderListItemFetcher>
			<OrderModal />
		</>
	);
}

export default OrderTemp;
