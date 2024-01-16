import styled from '@emotion/styled';
import Button from '@atoms/Button';
import { flexColumn, fixed } from '@styles/mixins';
import { fontMid } from '@styles/fonts';

const Wrapper = styled.div`
	${fixed(`bottom`)};
	${flexColumn};
	${fontMid};
	justify-content: space-between;
	width: 100%;
	height: 170px;
	padding: var(--padding-m);
	border-radius: 20px 20px 0 0;
	box-shadow: var(--shadow-top-s);
`;

const OrderCount = styled.div`
	text-align: right;
`;

const OrderPrice = styled.div`
	text-align: right;
`;

const OrderButton = styled(Button)`
	${fontMid};
	width: 100%;
	height: 48px;
	border-radius: 0;
`;

function OrderModal() {
	return (
		<Wrapper>
			<div>
				<OrderCount>{`총 수량 : 개`}</OrderCount>
				<OrderPrice>{`총 가격 : 원`}</OrderPrice>
			</div>
			<OrderButton>주문하기</OrderButton>
		</Wrapper>
	);
}

export default OrderModal;
