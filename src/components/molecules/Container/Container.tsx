import styled from '@emotion/styled';
import OrderItem from '@molecules/OrderItem';
import { orderItemState } from '@states/atom';
import { useRecoilValue } from 'recoil';
import { flexColumn } from '@styles/mixins';
import type { OrderContainerPropsType } from '@templates/Order/OrderTemp';
import Loading from '@molecules/Loading';

const Wrapper = styled.section`
	${flexColumn};
	gap: 18px;
	padding: var(--padding-s) var(--padding-m) 200px;
	margin-top: 57px;
`;

const Target = styled.div`
	height: 1px;
`;

export function OrderListContainer({
	isFetching,
	innerRef,
}: OrderContainerPropsType) {
	const value = useRecoilValue(orderItemState);
	return (
		<Wrapper>
			{isFetching && <Loading type="order" />}
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
			<Target ref={innerRef} />
		</Wrapper>
	);
}
