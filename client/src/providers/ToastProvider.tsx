'use client';

import { useTheme } from 'next-themes';
import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

export default function ToastProvider({
	children,
}: PropsWithChildren<unknown>) {
	const { resolvedTheme } = useTheme();

	return (
		<>
			{children}
			<ToastContainer theme={resolvedTheme} position="bottom-right" />
		</>
	);
}
