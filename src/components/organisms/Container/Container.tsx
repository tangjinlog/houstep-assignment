import styled from '@emotion/styled';
import {
	orderItemState,
	orderListState,
	orderSelectedState,
} from '@states/atom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { useCallback } from 'react';
import { flexColumn } from '@styles/mixins';
import OrderItem from '@molecules/OrderItem';
import Loading from '@molecules/Loading';
import { useModal, useRouteControl } from '@utils/hooks';
import type { OrderContainerPropsType } from '@templates/Order/OrderTemp';

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
	const [Modal, handleOpen] = useModal();
	const orderList = useRecoilValue(orderItemState);
	const isSelected = useRecoilValue(orderSelectedState);
	const resetCount = useResetRecoilState(orderListState);
	const { unBlockingWithCallback } = useRouteControl(handleOpen, {
		condition: isSelected,
		exceptUrl: ['/complete', '/error'],
	});

	const handleReset = useCallback(() => {
		document.body.style.overflow = 'auto';
		resetCount();
	}, [resetCount]);

	return (
		<Wrapper>
			{isFetching && <Loading type="order" />}
			<Modal>
				<Modal.Overlay />
				<Modal.Title>정말 나가시겠습니까?</Modal.Title>
				<Modal.Desc>작성중인 주문서가 초기화됩니다.</Modal.Desc>
				<Modal.CancelButton>취소</Modal.CancelButton>
				<Modal.ExecuteButton
					unBlockingWithCallback={() => unBlockingWithCallback(handleReset)}
				>
					나가기
				</Modal.ExecuteButton>
			</Modal>
			{orderList
				? orderList.map((item) => (
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
