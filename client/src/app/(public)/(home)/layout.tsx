import { MainHeader } from '@/components/Layout/Header';

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<MainHeader />
			<main>{children}</main>
		</>
	);
}
