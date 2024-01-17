import { useInfiniteQuery } from '@tanstack/react-query';
import { orderKey } from '@queries/constants';
import { orderHandlers } from '..';

export const useFetchOrderItems = () => {
	const { data, isError, hasNextPage, isFetching, fetchNextPage } =
		useInfiniteQuery({
			queryKey: orderKey.list(),
			queryFn: ({ pageParam }) => orderHandlers.getItems(pageParam),
			initialPageParam: 1,
			getNextPageParam: (lastPage, allPages, lastPageParam) => {
				if (lastPageParam >= lastPage.pages) {
					return undefined;
				} else {
					return lastPageParam + 1;
				}
			},
		});
	return {
		data: data,
		isError,
		curPage: data?.pageParams[data?.pageParams.length - 1],
		hasNextPage,
		isFetching,
		fetchNextPage,
	};
};
