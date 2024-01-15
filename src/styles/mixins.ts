import { css } from '@emotion/react';

export const flexCenter = css`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: var(--gap-m);
`;

export const flexColumn = css`
	display: flex;
	flex-direction: column;
`;

export const flexBetween = css`
	display: flex;
	justify-content: space-between;
`;

export const fullScreen = css`
	width: 100vw;
	height: 100vh;
`;

export const absoluteCenter = css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate3d(-50%, -50%, 0);
`;
