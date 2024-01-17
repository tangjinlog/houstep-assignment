import { useFetchOrderItems } from '@queries/order/hooks';
import { orderItemState } from '@states/atom';
import { useEffect, useMemo } from 'react';
import { useSetRecoilState } from 'recoil';
import Loading from '@molecules/Loading';

export function OrderListItemFetcher({
	children,
}: {
	children: React.ReactNode | Function;
}) {
	const setItems = useSetRecoilState(orderItemState);
	const { data, isError, hasNextPage, isFetching, fetchNextPage } =
		useFetchOrderItems();

	const items = useMemo(
		() => (data ? data.pages.flatMap(({ data }) => data) : []),
		[data],
	);

	useEffect(() => {
		setItems(items);
	}, [data]);

	if (isError) {
		//TODO: custom Error 적용 + ErrorBoundary
		throw new Error();
	}

	if (isFetching) {
		return <Loading type={'order'} />;
	}
	const toRender =
		typeof children === 'function'
			? children({ fetchNextPage, hasNextPage, isFetching })
			: children;

	return <>{toRender}</>;
}
