import styled from '@emotion/styled';
import Logo from '@atoms/Logo';
import { flexBetween } from '@styles/mixins';

const Wrapper = styled.div`
	${flexBetween};
	align-items: center;
	width: 100%;
	height: 57px;
	padding: var(--padding-xs);
	background-color: var(--black);
	box-shadow: var(--shadow-bottom-s);
`;

function Header() {
	return (
		<Wrapper>
			<Logo size="mid" />
		</Wrapper>
	);
}

export default Header;
