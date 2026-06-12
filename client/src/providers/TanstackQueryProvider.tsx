'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useState } from 'react';

export const TanstackQueryProvider = ({
	children,
}: PropsWithChildren<unknown>) => {
	const router = useRouter();

	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
					refetchOnMount: true,
					retry: (failureCount, error) => {
						if (error.message === 'Unauthorized' && failureCount < 3) {
							router.refresh();
							return true;
						}

						return failureCount < 4;
					},
				},
			},
		}),
	);

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
