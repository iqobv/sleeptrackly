import { MainProvider } from '@/providers/MainProvider';
import '@shared/tables/styles/index.css';
import { User } from '@shared/types';
import '@shared/ui/styles/global.scss';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { cookies } from 'next/headers';
import './index.scss';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: {
		default: 'Admin Sleeptrackly',
		template: '%s - Admin Sleeptrackly',
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookieStore = await cookies();
	const hasSession = cookieStore.has('session');
	const allCookies = cookieStore.toString();

	let user = null;

	const getUser = async () => {
		const res = await fetch(`${process.env.API_URL}/v1/auth/me`, {
			headers: {
				'Content-Type': 'application/json',
				cookie: allCookies,
			},
		});
		const data = (await res.json()) as User;

		if (res.ok && data?.id) return data;

		return null;
	};

	if (hasSession) {
		const res = await getUser();
		if (res?.id && res.role === 'ADMIN') {
			user = res;
		} else {
			await fetch(`${process.env.API_URL}/v1/auth/logout`, {
				headers: {
					'Content-Type': 'application/json',
					cookie: allCookies,
				},
			});
			user = null;
		}
	}

	return (
		<html lang="en" suppressHydrationWarning>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, interactive-widget=resizes-content"
			/>
			<body className={`${geistSans.variable}`}>
				<MainProvider user={user}>{children}</MainProvider>
			</body>
		</html>
	);
}
