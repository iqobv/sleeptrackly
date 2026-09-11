import { ShopHeader } from '@/components/Layout/Header/ShopHeader/ShopHeader';
import { AuthGuard } from '@/providers/AuthGuard';
import { PropsWithChildren } from 'react';

export default function ShopLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<AuthGuard>
			<ShopHeader />
			<main>{children}</main>
		</AuthGuard>
	);
}
