import MainProvider from '@/providers/MainProvider';
import { IUser } from '@/types';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { cookies } from 'next/headers';
import './globals.scss';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: {
		default: 'Sleep Tracker',
		template: '%s - Sleep Tracker',
	},
	description: 'Sleep Tracker',
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
		const data = (await res.json()) as IUser;

		if (res.ok && data?.id) return data;
		return null;
	};

	if (hasSession) {
		const res = await getUser();
		if (res?.id) user = res;
		else cookieStore.delete('session');
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
