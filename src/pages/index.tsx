import styled from '@emotion/styled';
import { fullScreen, flexCenter } from '@styles/mixins';
import Button from '@atoms/Button';
import Logo from '@atoms/Logo';

const Wrapper = styled.main`
	${fullScreen};
	${flexCenter};
	flex-direction: column;
	background-color: var(--black);
	gap: var(--gap-l);
`;

function index() {
	return (
		<Wrapper>
			<Logo size="big" />
			<Button primary size="big">
				주문하러 가기
			</Button>
		</Wrapper>
	);
}

export default index;
