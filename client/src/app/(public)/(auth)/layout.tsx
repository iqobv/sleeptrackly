import { AuthHeader } from '@/components/Layout/Header';

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<AuthHeader />
			<main>{children}</main>
		</>
	);
}
