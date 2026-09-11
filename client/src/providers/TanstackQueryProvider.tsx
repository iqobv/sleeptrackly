'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { PropsWithChildren, useState } from 'react';

export const TanstackQueryProvider = ({
	children,
}: PropsWithChildren<unknown>) => {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
					refetchOnMount: true,
					retry: (failureCount, error) => {
						if (isAxiosError(error)) {
							const status = error.response?.status;

							if (status === 401 || status === 403 || status === 404)
								return false;
						}

						return failureCount < 4;
					},
				},
			},
		}),
	);

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
