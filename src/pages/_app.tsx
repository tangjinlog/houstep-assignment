import '@styles/globals.css';
import '@styles/variables.css';
import { RecoilRoot } from 'recoil';
import { useState } from 'react';
import {
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { GlobalErrorBoundary } from '@templates/ErrorBoundary';
import { inter } from '@styles/fonts';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: 0,
						refetchOnWindowFocus: false,
						throwOnError: true,
					},
					mutations: {
						retry: 0,
						throwOnError: true,
					},
				},
			}),
	);
	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<HydrationBoundary state={pageProps.dehydratedState}>
					<GlobalErrorBoundary>
						<main className={inter.className}>
							<Component {...pageProps} />
						</main>
					</GlobalErrorBoundary>
				</HydrationBoundary>
			</QueryClientProvider>
		</RecoilRoot>
	);
}
