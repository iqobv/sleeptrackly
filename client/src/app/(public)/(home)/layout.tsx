import { Footer } from '@/components/Layout/Footer/Footer';
import { MainHeader } from '@/components/Layout/Header/MainHeader/MainHeader';

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<MainHeader />
			<main>{children}</main>
			<Footer />
		</>
	);
}
