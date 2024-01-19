import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Image from 'next/image';
import { useState } from 'react';
import { fontMid, orderTagText } from '@styles/fonts';
import { flexBetween, flexCenter } from '@styles/mixins';
import OrderCounter from '@molecules/OrderCounter';
import OrderPlaceholder from '@images/order-placeholder.png';

interface PropTypes extends React.HTMLAttributes<HTMLDivElement> {
	isCounted: boolean;
}

const Wrapper = styled.div<PropTypes>`
	display: flex;
	gap: var(--gap-xs);
	width: 100%;
	padding: 9px 12px;
	border: 1px solid rgba(0, 0, 0, 0.3);
	border-radius: 10px;
	${(props) =>
		props.isCounted
			? css`
					background-color: #f75a2f1a;
				`
			: ''};
`;

const ContentWrapper = styled.div`
	${flexBetween};
	flex-direction: column;
	width: 100%;
`;

const PriceWrapper = styled.div`
	${flexBetween};
`;

interface OrderItemProps {
	id: string;
	name: string;
	event: number;
	materialType: number;
	price: number;
}

function OrderItem({ id, name, event, materialType, price }: OrderItemProps) {
	const [isCounted, setIsCounted] = useState(false);
	return (
		<Wrapper isCounted={isCounted}>
			<OrderItem.Image
				src={OrderPlaceholder}
				width={62}
				height={62}
				alt="OrderItem Image"
			/>
			<ContentWrapper>
				<OrderItem.Title>
					{name}
					{!!event ? <OrderItem.EventTag>이벤트</OrderItem.EventTag> : null}
				</OrderItem.Title>
				<PriceWrapper>
					<OrderCounter id={id} price={price} setIsCounted={setIsCounted} />
					<OrderItem.Price>{price}원</OrderItem.Price>
				</PriceWrapper>
			</ContentWrapper>
		</Wrapper>
	);
}

export default OrderItem;

OrderItem.Image = styled(Image)``;

OrderItem.Title = styled.span`
	${fontMid}
	position: relative;
	width: fit-content;
	height: 23px;
	padding-right: 9px;
`;

OrderItem.EventTag = styled.span`
	${orderTagText};
	// ${flexCenter};
	display: inline-flex;
	position: absolute;
	left: 100%;
	color: var(--white);
	width: 53px;
	height: 23px;
	background-color: var(--tag-bg-1);
	border-radius: 10px;
`;

OrderItem.Count = styled.span`
	${fontMid}
	display: inline-block;
`;

OrderItem.Price = styled.span`
	${fontMid}
	display: inline-block;
`;
