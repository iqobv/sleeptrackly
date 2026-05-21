'use client';

import { User } from '@/types';
import { PropsWithChildren } from 'react';
import AuthProvider from './AuthProvider';
import NuqsProvider from './NuqsProvider';
import { TanstackQueryProvider } from './TanstackQueryProvider';
import ThemeProvider from './ThemeProvider';
import ToastProvider from './ToastProvider';

interface MainProviderProps {
	user: User | null;
}

export default function MainProvider({
	children,
	user,
}: PropsWithChildren<MainProviderProps>) {
	return (
		<AuthProvider user={user}>
			<TanstackQueryProvider>
				<ThemeProvider>
					<ToastProvider>
						<NuqsProvider>{children}</NuqsProvider>
					</ToastProvider>
				</ThemeProvider>
			</TanstackQueryProvider>
		</AuthProvider>
	);
}
