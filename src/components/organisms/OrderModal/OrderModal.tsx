import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useEffect } from 'react';
import Button from '@atoms/Button';
import { fontMid } from '@styles/fonts';
import { flexColumn, fixed } from '@styles/mixins';
import { useSubmitOrder } from '@queries/order/hooks';
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
//TODO: 주문 데이터 보내기
// orderList 버튼에 보내기
function OrderModal() {
	const isSelected = useSetRecoilState(orderSelectedState);
	const orderList = useRecoilValue(orderListState);
	const { data, mutateAsync, isPending } = useSubmitOrder();
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

	const handleClick = () => {
		mutateAsync(orderList);
		isSelected(false);
	};

	useEffect(() => {
		orderList.length - 1 === 0 ? isSelected(false) : isSelected(true);
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
				disabled={totalCount === 0}
				onClick={handleClick}
			>
				{isPending ? `로딩중...` : `주문하기`}
			</OrderButton>
		</Wrapper>
	);
}

export default OrderModal;
