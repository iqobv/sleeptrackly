import { MainProvider } from '@/providers/MainProvider';
import '@shared/tables/styles/index.css';
import '@shared/ui/styles/global.scss';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
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
	return (
		<html lang="en" suppressHydrationWarning>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, interactive-widget=resizes-content"
			/>
			<body className={geistSans.variable}>
				<MainProvider>{children}</MainProvider>
			</body>
		</html>
	);
}
