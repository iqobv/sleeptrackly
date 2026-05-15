'use client';

import { User } from '@/types';
import { PropsWithChildren } from 'react';
import AuthProvider from './AuthProvider';
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
					<ToastProvider>{children}</ToastProvider>
				</ThemeProvider>
			</TanstackQueryProvider>
		</AuthProvider>
	);
}
