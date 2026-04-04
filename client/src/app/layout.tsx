import TermlyCMP from '@/components/TermlyCMP';
import { PAGES } from '@/config';
import MainProvider from '@/providers/MainProvider';
import { IUser } from '@/types';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import './index.scss';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: {
		default: 'Sleeptrackly',
		template: '%s - Sleeptrackly',
	},
	description: 'Sleep Tracker',
};

const WEBSITE_UUID = process.env.WEBSITE_UUID;

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
			cache: 'no-store',
			next: { revalidate: 0 },
		});
		const data = (await res.json()) as IUser;

		if (res.status === 401) {
			return null;
		}

		if (res.ok && data?.id) return data;
		return null;
	};

	if (hasSession) {
		const res = await getUser();
		if (res?.id) {
			user = res;
		} else {
			redirect(PAGES.LOGOUT);
		}
	}

	return (
		<html lang="en" suppressHydrationWarning>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, interactive-widget=resizes-content"
			/>
			<body className={`${geistSans.variable}`}>
				{WEBSITE_UUID && <TermlyCMP websiteUUID={WEBSITE_UUID} />}
				<MainProvider user={user}>{children}</MainProvider>
			</body>
		</html>
	);
}
