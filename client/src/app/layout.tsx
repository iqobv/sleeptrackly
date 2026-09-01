import { AnalyticsWrapper } from '@/components/Analytics/AnalyticsWrapper';
import { env } from '@/env';
import { MainProvider } from '@/providers/MainProvider';
import '@shared/ui/styles/global.scss';
import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import './index.scss';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const baseUrl = env.NEXT_PUBLIC_CLIENT_URL;

export const viewport: Viewport = {
	themeColor: '#0b0b0b',
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	interactiveWidget: 'resizes-content',
};

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: 'Sleeptrackly',
		template: '%s - Sleeptrackly',
	},
	description:
		'Track your sleep patterns and improve your sleep quality with Sleeptrackly.',
	applicationName: 'Sleeptrackly',
	keywords: [
		'sleep tracking',
		'sleep analysis',
		'sleep quality',
		'sleep patterns',
		'habit tracking',
	],
	appleWebApp: {
		title: 'Sleeptrackly',
		statusBarStyle: 'default',
		capable: true,
	},
	openGraph: {
		title: 'Sleeptrackly',
		description: 'Track and Improve Your Sleep',
		url: baseUrl,
		siteName: 'Sleeptrackly',
		locale: 'en_US',
		type: 'website',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Sleeptrackly preview image',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Sleeptrackly',
		description: 'Track and Improve Your Sleep',
		images: ['/og-image.jpg'],
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable}`}>
				<MainProvider>{children}</MainProvider>
				<AnalyticsWrapper />
			</body>
		</html>
	);
}
