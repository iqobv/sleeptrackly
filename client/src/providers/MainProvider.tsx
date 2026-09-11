'use client';

import { PropsWithChildren } from 'react';
import { NuqsProvider } from './NuqsProvider';
import { TanstackQueryProvider } from './TanstackQueryProvider';
import { ThemeProvider } from './ThemeProvider';
import { ToastProvider } from './ToastProvider';

export const MainProvider = ({ children }: PropsWithChildren<unknown>) => {
	return (
		<TanstackQueryProvider>
			<ThemeProvider>
				<ToastProvider>
					<NuqsProvider>{children}</NuqsProvider>
				</ToastProvider>
			</ThemeProvider>
		</TanstackQueryProvider>
	);
};
