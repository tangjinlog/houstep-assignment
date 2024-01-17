import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from 'react';
import Button from '@atoms/Button';
import { fontMid } from '@styles/fonts';
import { orderListState } from '@states/atom';
import { useRecoilState } from 'recoil';

const buttonStyle = css`
	${fontMid};
	display: inline-block;
	width: 19px;
	height: 22px;
	background: none;
`;

const Wrapper = styled.div`
	${fontMid};
	display: flex;
	gap: var(--gap-xs);
`;
const Count = styled.p``;

const IncrementButton = styled(Button)`
	${buttonStyle}
	line-height: 25px;
`;
const DecrementButton = styled(Button)`
	${buttonStyle}
`;

interface OrderCounterProps {
	id: string;
	price: number;
	setIsCounted: Dispatch<SetStateAction<boolean>>;
}

function OrderCounter({ id, price, setIsCounted }: OrderCounterProps) {
	const [orderList, setOrderList] = useRecoilState(orderListState);
	const [isClicked, setIsClicked] = useState(false);
	const [count, setCount] = useState(0);

	let orderMap = new Map();

	useEffect(() => {
		for (let item of orderList) {
			orderMap.set(item.id, {
				id: item.id,
				count: item.count,
				totalPrice: item.totalPrice,
			});
		}
	}, [orderList]);

	const updateOrder = useCallback(
		(type: 'inc' | 'dec') => {
			const updateMap = orderMap.set(id, {
				id,
				count: type === 'inc' ? count + 1 : count - 1,
				totalPrice: type === 'inc' ? price * (count + 1) : price * (count - 1),
			});
			const updatedList = [...updateMap].flatMap(
				([key, orderItem]) => orderItem,
			);
			return updatedList;
		},
		[count],
	);

	const incrementCount = useCallback(() => {
		if (count < 999) {
			setIsCounted(true);
			setCount((prev) => prev + 1);
			const items = updateOrder('inc');
			setOrderList(items);
		}
	}, [count]);

	const decrementCount = useCallback(() => {
		if (count > 0) {
			setCount((prev) => prev - 1);
			const items = updateOrder('dec');
			setOrderList(items);
			if (count === 1) {
				setIsCounted(false);
			}
		}
	}, [count]);

	const handleSubmit = useCallback(
		(e: any) => {
			e.preventDefault();
			setIsClicked(false);
		},
		[count],
	);
	//TODO: useInput 구현
	return (
		<Wrapper>
			<DecrementButton onClick={decrementCount}>-</DecrementButton>
			{!isClicked ? (
				<Count onClick={() => setIsClicked((prev) => !prev)}>{count}</Count>
			) : (
				<form onSubmit={handleSubmit}>
					<input
						type="number"
						style={{ width: '30px', textAlign: 'center' }}
						value={count}
						onChange={(e) => setCount(Number(e.target.value))}
						max={999}
						autoFocus
					/>
				</form>
			)}
			<IncrementButton onClick={incrementCount}>+</IncrementButton>
		</Wrapper>
	);
}

export default OrderCounter;
