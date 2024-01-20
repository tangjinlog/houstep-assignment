import styled from '@emotion/styled';
import { fullScreen, flexCenter, ani } from '@styles/mixins';
import Button from '@atoms/Button';
import Logo from '@atoms/Logo';
import Link from 'next/link';

const Wrapper = styled.section`
	${fullScreen};
	${flexCenter};
	flex-direction: column;
	background-color: var(--black);
	gap: var(--gap-l);
`;

const OrderPageButton = styled(Link)`
	${ani('click')};
`;

function index() {
	return (
		<Wrapper>
			<Logo size="big" />
			<OrderPageButton href={'/order'}>
				<Button primary size="big">
					주문하러 가기
				</Button>
			</OrderPageButton>
		</Wrapper>
	);
}

export default index;
