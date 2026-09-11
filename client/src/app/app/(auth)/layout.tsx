import { AuthHeader } from '@/components/Layout/Header/AuthHeader/AuthHeader';

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
