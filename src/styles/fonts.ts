import { css } from '@emotion/react';
import { Inter, Roboto } from 'next/font/google';

export const inter = Inter({
	subsets: ['latin'],
});

export const roboto = Roboto({
	subsets: ['latin'],
	weight: ['400'],
});

/* Fonts */
const common = css`
	-webkit-font-smoothing: antialiased;
`;

export const fontMid = css`
	${common};
	font-size: 18px;
`;

export const fontBig = css`
	${common};
	font-size: 25px;
`;

export const orderTagText = css`
	${common};
	font-family: ${roboto.style.fontFamily};
	font-size: 13px;
	line-height: 18px;
	letter-spacing: 0.16px;
`;
