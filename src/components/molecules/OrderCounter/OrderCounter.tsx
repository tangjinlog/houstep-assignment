import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import Button from '@atoms/Button';
import { fontMid } from '@styles/fonts';
import { orderListState } from '@states/atom';
import { useSetRecoilState } from 'recoil';
//TODO: useRouteControl 적용
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

const CounterForm = styled.form``;

const Input = styled.input`
	width: 30px;
	text-align: center;
	&[type='number']::-webkit-inner-spin-button,
	&[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

interface OrderCounterProps {
	id: string;
	price: number;
	setIsCounted: Dispatch<SetStateAction<boolean>>;
}

export type OrderTypes = { id: string; count: number; totalPrice: number };

function OrderCounter({ id, price, setIsCounted }: OrderCounterProps) {
	const setOrderList = useSetRecoilState(orderListState);
	const [isClicked, setIsClicked] = useState(false);
	const [count, setCount] = useState(0);

	let orderMap = new Map();

	const mapSetter = useCallback(
		(map: Map<string, OrderTypes>, obj: OrderTypes, type?: 'inc' | 'dec') => {
			if (type) {
				return orderMap.set(id, {
					id,
					count: type === 'inc' ? count + 1 : count - 1,
					totalPrice:
						type === 'inc' ? price * (count + 1) : price * (count - 1),
				});
			}
			return map.set(obj.id, {
				id: obj.id,
				count: obj.count,
				totalPrice: obj.totalPrice,
			});
		},
		[count],
	);

	const updateOrder = useCallback(
		(type: 'inc' | 'dec') => {
			const order = { id, count, totalPrice: price };
			mapSetter(orderMap, order, type);
			return orderMap.get(id);
		},
		[count],
	);

	const updateOrderList = useCallback(
		(prevList: OrderTypes[], updatedOrder: OrderTypes) => {
			for (let order of prevList) {
				mapSetter(orderMap, order);
			}
			mapSetter(orderMap, updatedOrder);

			const updatedList: OrderTypes[] = [...orderMap].flatMap(
				([key, orderList]) => orderList,
			);
			return updatedList;
		},
		[count],
	);

	const incrementCount = useCallback(() => {
		if (count < 999) {
			setIsClicked(false);
			setIsCounted(true);
			setCount((prev) => prev + 1);
			const updatedOrder = updateOrder('inc');
			setOrderList((prevList) => updateOrderList(prevList, updatedOrder));
		}
	}, [count, updateOrder]);

	const decrementCount = useCallback(() => {
		if (count > 0) {
			if (count === 1) setIsCounted(false);
			setIsClicked(false);
			setCount((prev) => prev - 1);
			const updatedOrder = updateOrder('dec');
			setOrderList((prevList) => updateOrderList(prevList, updatedOrder));
		}
	}, [count, updateOrder]);

	const handleSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			setIsClicked(false);
			const counts = Number(e.currentTarget.counter.value);
			counts === 0 ? setIsCounted(false) : setIsCounted(true);

			const updatedOrder = {
				id,
				count: count,
				totalPrice: count * price,
			};
			setOrderList((prevList) => updateOrderList(prevList, updatedOrder));
		},
		[count],
	);

	return (
		<Wrapper>
			<DecrementButton onClick={decrementCount}>-</DecrementButton>
			{!isClicked ? (
				<Count onClick={() => setIsClicked((prev) => !prev)}>{count}</Count>
			) : (
				<CounterForm onSubmit={handleSubmit}>
					<Input
						type="number"
						name="counter"
						value={count}
						onChange={(e) => setCount(Number(e.target.value))}
						max={999}
						autoFocus
					/>
				</CounterForm>
			)}
			<IncrementButton onClick={incrementCount}>+</IncrementButton>
		</Wrapper>
	);
}

export default OrderCounter;
