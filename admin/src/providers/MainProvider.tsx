'use client';

import { User } from '@/types/user/user.types';
import { PropsWithChildren } from 'react';
import { AuthProvider } from './AuthProvider';
import { NuqsProvider } from './NuqsProvider';
import { TanstackQueryProvider } from './TanstackQueryProvider';
import { ThemeProvider } from './ThemeProvider';
import { ToastProvider } from './ToastProvider';

interface MainProviderProps {
	user: User | null;
}

export const MainProvider = ({
	children,
	user,
}: PropsWithChildren<MainProviderProps>) => {
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
};
