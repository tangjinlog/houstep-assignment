import { OrderListItemFetcher } from '@organisms/Fetcher';
import { OrderListContainer } from '@organisms/Container';
import OrderModal from '@organisms/OrderModal';
import { ApiErrorBoundary } from '@templates/ErrorBoundary';

export interface OrderContainerPropsType {
	isFetching: boolean;
	innerRef: React.RefObject<HTMLDivElement>;
}
function OrderTemp() {
	return (
		//TODO: apiBoundary
		<ApiErrorBoundary>
			<OrderListItemFetcher>
				{(props: OrderContainerPropsType) => <OrderListContainer {...props} />}
			</OrderListItemFetcher>
			<OrderModal />
		</ApiErrorBoundary>
	);
}

export default OrderTemp;
