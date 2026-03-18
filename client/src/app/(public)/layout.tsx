import { Header } from '@/components/Layout/Header';
import { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div id="app">
			<Header />
			<main>{children}</main>
		</div>
	);
}
