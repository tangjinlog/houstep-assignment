import { css } from '@emotion/react';
import { Inter } from 'next/font/google';

export const inter = Inter({
	subsets: ['latin'],
});

/* Fonts */
const common = css`
	font-family: ${inter.style.fontFamily};
	-webkit-font-smoothing: antialiased;
`;

export const fontBig = css`
	${common};
	font-size: 25px;
`;
