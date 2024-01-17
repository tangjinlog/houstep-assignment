import '@styles/globals.css';
import '@styles/variables.css';
import { RecoilRoot } from 'recoil';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import {
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { inter } from '@styles/fonts';

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: 0,
						refetchOnWindowFocus: false,
					},
				},
			}),
	);
	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<HydrationBoundary state={pageProps.dehydratedState}>
					<main className={inter.className}>
						<Component {...pageProps} />
					</main>
				</HydrationBoundary>
			</QueryClientProvider>
		</RecoilRoot>
	);
}
