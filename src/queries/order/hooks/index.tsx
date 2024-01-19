import { useRouter } from 'next/router';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { orderKey } from '@queries/constants';
import { orderHandlers } from '..';
import type { OrderTypes } from '@molecules/OrderCounter/OrderCounter';

export const useFetchOrderItems = () => {
	const { data, isError, hasNextPage, isFetching, fetchNextPage } =
		useInfiniteQuery({
			queryKey: orderKey.list(),
			queryFn: ({ pageParam }) => orderHandlers.getItems(pageParam),
			initialPageParam: 1,
			getNextPageParam: (lastPage, allPages, lastPageParam) =>
				lastPageParam >= lastPage.pages ? undefined : lastPageParam + 1,
		});
	return {
		data: data,
		isError,
		hasNextPage,
		isFetching,
		fetchNextPage,
	};
};

export const useSubmitOrder = () => {
	const router = useRouter();
	const { data, mutateAsync, isPending } = useMutation({
		mutationKey: orderKey.submit(),
		mutationFn: (orderList: OrderTypes[]) => orderHandlers.postOrder(orderList),
		onSuccess: () => router.push('/complete'),
		onError: () => router.push('/error'),
	});
	return { data, mutateAsync, isPending };
};
