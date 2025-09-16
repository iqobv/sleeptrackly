import Header from '@/components/Layout/Header/Header';
import { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div>
			<Header />
			<main>{children}</main>
		</div>
	);
}
