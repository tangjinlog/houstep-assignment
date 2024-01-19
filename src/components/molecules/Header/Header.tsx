import styled from '@emotion/styled';
import Logo from '@atoms/Logo';
import Link from 'next/link';
import { flexBetween, fixed } from '@styles/mixins';

const Wrapper = styled.div`
	${fixed(`top`)}
	${flexBetween};
	width: 100%;
	height: 57px;
	padding: var(--padding-xs);
	z-index: var(--idx-5);
	background-color: var(--black);
	box-shadow: var(--shadow-bottom-s);
`;

const HomeButton = styled(Link)`
	display: flex;
	align-items: center;
	background: none;
`;

function Header() {
	return (
		<Wrapper>
			<HomeButton href={'/'} replace>
				<Logo size="mid" />
			</HomeButton>
		</Wrapper>
	);
}

export default Header;
