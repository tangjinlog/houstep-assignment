import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useCallback, useEffect } from 'react';
import Button from '@atoms/Button';
import { fontMid } from '@styles/fonts';
import { flexColumn, fixed } from '@styles/mixins';
import {
	useSubmitOrderComplete,
	useSubmitOrderError,
} from '@queries/order/hooks';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { orderListState, orderSelectedState } from '@states/atom';
import type { ButtonPropTypes } from '@atoms/Button/Button';

const Wrapper = styled.div`
	${fixed(`bottom`)};
	${flexColumn};
	${fontMid};
	justify-content: space-between;
	width: 100%;
	height: 170px;
	padding: var(--padding-m);
	z-index: var(--idx-5);
	background-color: var(--white);
	border-radius: 20px 20px 0 0;
	box-shadow: var(--shadow-top-s);
`;

const OrderCount = styled.div`
	text-align: right;
`;

const OrderPrice = styled.div`
	text-align: right;
`;

interface OrderButtonPropTypes extends ButtonPropTypes {
	totalCount: number;
	isPending: boolean;
}

const OrderButton = styled(Button)<OrderButtonPropTypes>`
	${fontMid};
	width: 100%;
	height: 48px;
	border-radius: 0;
	color: var(--white);
	background-color: var(--color-gray-3);
	${(props) =>
		props.totalCount > 0
			? css`
					background-color: var(--black);
				`
			: ''}
	${(props) =>
		props.isPending
			? css`
					background-color: var(--color-gray-3);
				`
			: ''}
`;
function OrderModal() {
	const isSelected = useSetRecoilState(orderSelectedState);
	const orderList = useRecoilValue(orderListState);
	// Complete용 query
	const { data, mutateAsync, isPending } = useSubmitOrderComplete();
	// Error용 query
	// const { data, mutateAsync, isPending } = useSubmitOrderError();
	const [totalCount, totalPrice] =
		orderList &&
		orderList.reduce(
			(acc, cur) => {
				acc[0] += cur.count;
				acc[1] += cur.totalPrice;
				return acc;
			},
			[0, 0],
		);

	const handleClick = useCallback(() => {
		mutateAsync(orderList);
		isSelected(false);
	}, [orderList]);

	useEffect(() => {
		orderList.length === 0 ? isSelected(false) : isSelected(true);
	}, [orderList]);

	console.log(orderList);
	return (
		<Wrapper>
			<div>
				<OrderCount>{`총 수량 : ${totalCount}개`}</OrderCount>
				<OrderPrice>{`총 가격 : ${totalPrice.toLocaleString()}원`}</OrderPrice>
			</div>
			<OrderButton
				totalCount={totalCount}
				isPending={isPending}
				disabled={totalCount === 0}
				onClick={handleClick}
			>
				{isPending ? `로딩중...` : `주문하기`}
			</OrderButton>
		</Wrapper>
	);
}

export default OrderModal;
