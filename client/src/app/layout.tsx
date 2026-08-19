import { TermlyCMP } from '@/components/TermlyCMP';
import { env } from '@/env';
import { MainProvider } from '@/providers/MainProvider';
import '@shared/ui/styles/global.scss';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Suspense } from 'react';
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

const WEBSITE_UUID = env.WEBSITE_UUID;

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, interactive-widget=resizes-content"
			/>
			<body className={`${geistSans.variable}`}>
				<Analytics />
				<Suspense fallback={null}>
					{WEBSITE_UUID && <TermlyCMP websiteUUID={WEBSITE_UUID} />}
				</Suspense>
				<MainProvider>{children}</MainProvider>
			</body>
		</html>
	);
}
