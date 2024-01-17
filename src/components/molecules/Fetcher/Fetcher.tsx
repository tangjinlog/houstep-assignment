import { useFetchOrderItems } from '@queries/order/hooks';
import { orderItemState } from '@states/atom';
import { useEffect, useMemo } from 'react';
import { useSetRecoilState } from 'recoil';

export function OrderListItemFetcher({
	children,
}: {
	children: React.ReactNode | Function;
}) {
	const setItems = useSetRecoilState(orderItemState);
	const { data, isError, curPage, hasNextPage, isFetching, fetchNextPage } =
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
		return (
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '45%',
					fontSize: '4rem',
				}}
			>
				준비중입니다.
			</div>
		);
	}
	const toRender =
		typeof children === 'function'
			? children({ fetchNextPage, hasNextPage, isFetching })
			: children;

	return (
		<>
			<div style={{ position: 'absolute', top: '50%', left: '45%' }}>
				<h2>{`${curPage}`}</h2>
			</div>
			{toRender}
		</>
	);
}
