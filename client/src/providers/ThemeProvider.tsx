'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

export const ThemeProvider = ({ children }: PropsWithChildren<unknown>) => (
	<NextThemesProvider enableSystem defaultTheme="system" attribute="class">
		{children}
	</NextThemesProvider>
);
