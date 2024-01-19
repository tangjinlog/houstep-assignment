import styled from '@emotion/styled';
import OrderItem from '@molecules/OrderItem';
import { orderItemState } from '@states/atom';
import { useRecoilValue } from 'recoil';
import { flexColumn } from '@styles/mixins';
import type { OrderContainerPropsType } from '@templates/Order/OrderTemp';

const Wrapper = styled.section`
	${flexColumn};
	gap: 18px;
	padding: var(--padding-s) var(--padding-m) 200px;
	margin-top: 57px;
`;

export function OrderListContainer({
	fetchNextPage,
	hasNextPage,
	isFetching,
}: OrderContainerPropsType) {
	const value = useRecoilValue(orderItemState);
	return (
		<Wrapper>
			<button
				onClick={() => {
					//TODO: to InterSection Observer
					if (hasNextPage && !isFetching) fetchNextPage();
				}}
			>
				다음페이지
			</button>
			{value
				? value.map((item) => (
						<OrderItem
							key={item.id}
							id={item.id}
							name={item.name}
							event={item.event}
							materialType={item.materialType}
							price={item.price}
						/>
					))
				: null}
		</Wrapper>
	);
}
