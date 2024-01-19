import styled from '@emotion/styled';
import { orderItemState, orderListState } from '@states/atom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { flexColumn } from '@styles/mixins';
import OrderItem from '@molecules/OrderItem';
import Loading from '@molecules/Loading';
import useModal from '@utils/hooks/useModal';
import useRouteControl from '@utils/hooks/useRouteControl';
import type { OrderContainerPropsType } from '@templates/Order/OrderTemp';
import { useCallback } from 'react';

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
	const { unBlockingWithCallback } = useRouteControl(handleOpen);
	const orderList = useRecoilValue(orderItemState);
	const resetCount = useResetRecoilState(orderListState);

	const handleReset = useCallback(() => {
		document.body.style.overflow = 'auto';
		resetCount();
	}, [resetCount]);

	return (
		<Wrapper>
			{isFetching && <Loading type="order" />}
			<Modal>
				<Modal.Overlay />
				<Modal.Title>라우터 감지 모달</Modal.Title>
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