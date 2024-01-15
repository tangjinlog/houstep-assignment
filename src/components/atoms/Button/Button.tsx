import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { fontBig } from '@styles/fonts';

interface PropTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	primary?: boolean;
	size?: 'big' | 'mid';
}

const primary = css`
	color: var(--black);
	background-color: var(--white);
`;

const big = css`
	width: 172px;
	height: 88px;
`;

const mid = css`
	width: 100px;
	height: 50px;
`;

const sizes = { big, mid };

const ButtonStyle = styled.button<PropTypes>`
	${fontBig};
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	border-radius: 20px;
	${(props) =>
		props.primary
			? primary
			: css`
					color: var(--white);
					background-color: var(--color-gray-3);
				`}
	${(props) => (props.size ? sizes[props.size] : '')}
`;

function Button({ children, ...props }: PropTypes) {
	return (
		<ButtonStyle type="button" {...props}>
			{children}
		</ButtonStyle>
	);
}

export default Button;
