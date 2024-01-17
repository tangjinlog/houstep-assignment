import styled from '@emotion/styled';
import Button from '@atoms/Button';
import { flexColumn, fixed } from '@styles/mixins';
import { fontMid } from '@styles/fonts';
import { useRecoilValue } from 'recoil';
import { orderListState } from '@states/atom';
import type { PropTypes } from '@atoms/Button/Button';
import { css } from '@emotion/react';

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

interface OrderButtonPropTypes extends PropTypes {
	totalCount: number;
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
`;

function OrderModal() {
	const orderList = useRecoilValue(orderListState);
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
	//TODO: 가격 점 찍기
	return (
		<Wrapper>
			<div>
				<OrderCount>{`총 수량 : ${totalCount}개`}</OrderCount>
				<OrderPrice>{`총 가격 : ${totalPrice}원`}</OrderPrice>
			</div>
			<OrderButton totalCount={totalCount} disabled={totalCount === 0}>
				주문하기
			</OrderButton>
		</Wrapper>
	);
}

export default OrderModal;
