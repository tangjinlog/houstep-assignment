import styled from '@emotion/styled';
import Logo from '@atoms/Logo';
import Link from 'next/link';
import { flexBetween, fixed } from '@styles/mixins';

const Wrapper = styled.div`
	${fixed(`top`)}
	${flexBetween};
	align-items: center;
	width: 100%;
	height: 57px;
	padding: var(--padding-xs);
	background-color: var(--black);
	box-shadow: var(--shadow-bottom-s);
`;

const HomeButton = styled(Link)`
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
