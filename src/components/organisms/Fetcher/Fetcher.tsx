import { useFetchOrderItems } from '@queries/order/hooks';
import { orderItemState } from '@states/atom';
import { useEffect, useMemo } from 'react';
import { useSetRecoilState } from 'recoil';
import { useIntersect } from '@utils/hooks/useIntersect';

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

	const innerRef = useIntersect(async (entry, observer) => {
		observer.unobserve(entry.target);
		if (hasNextPage && !isFetching) fetchNextPage();
	});

	useEffect(() => {
		setItems(items);
	}, [data]);

	if (isError) {
		//TODO: custom Error 적용 + ErrorBoundary
		throw new Error('목록을 불러오는 도중 에러가 발생했습니다.');
	}

	const toRender =
		typeof children === 'function'
			? children({ isFetching, innerRef })
			: children;

	return <>{toRender}</>;
}
