import { OrderListItemFetcher } from '@molecules/Fetcher/Fetcher';
import { OrderListContainer } from '@molecules/Container';
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
