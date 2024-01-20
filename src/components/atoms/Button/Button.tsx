import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { fontBig } from '@styles/fonts';

export interface ButtonPropTypes
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	primary?: boolean;
	size?: 'big' | 'mid';
}

const primary = css`
	${fontBig};
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

const StyledButton = styled.button<ButtonPropTypes>`
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	border-radius: 20px;
	cursor: pointer;
	${(props) => (props.primary ? primary : '')}
	${(props) => (props.size ? sizes[props.size] : '')}
`;

function Button({ children, ...props }: ButtonPropTypes) {
	return (
		<StyledButton type="button" {...props}>
			{children}
		</StyledButton>
	);
}

export default Button;
