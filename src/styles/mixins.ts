import { css, keyframes } from '@emotion/react';

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

type FixedType = 'top' | 'bottom' | 'all';
export const fixed = (props: FixedType) => css`
	position: fixed;
	top: ${props === 'top' || props === 'all' ? 0 : `initial`};
	left: ${props === 'all' ? 0 : `initial`};
	right: ${props === 'all' ? 0 : `initial`};
	bottom: ${props === 'bottom' || props === 'all' ? 0 : `initial`};
`;

type AniType = 'tremble' | 'pop' | 'click';
export const ani = (props: AniType) => {
	if (props === 'tremble') {
		const tremble = keyframes`
				0% {
			transform: rotate(25deg) scale(2);
		}
		20% {
			transform: rotate(-45deg) scale(1.2);
		}
		40% {
			transform: rotate(20deg);
		}
		60% {
			transform: rotate(-20deg);
		}
		`;

		return css`
			animation: ${tremble} 1s ease forwards;
		`;
	} else if (props === 'pop') {
		const pop = keyframes`
			0% {
			transform: translate3d(-50%,-50%,0) scale(0.3) ;
		}
		100% {
			transform: translate3d(-50%,-50%,0) scale(1);
		}
		`;
		return css`
			animation: ${pop} 0.1s ease-in-out forwards;
		`;
	} else if (props === 'click') {
		const click = keyframes`
			to {
			transform: scale(0.9) ;
		}
		`;
		return css`
			&:active {
				animation: ${click} 0.07s ease-in-out forwards;
			}
		`;
	}
};
