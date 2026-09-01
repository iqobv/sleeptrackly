import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Sleeptrackly App',
		short_name: 'Sleeptrackly',
		description:
			'Track your sleep patterns and improve your sleep quality with Sleeptrackly.',
		start_url: PRIVATE_PAGES.DASHBOARD,
		display: 'standalone',
		background_color: '#0a0a0a',
		theme_color: '#0b0b0b',
		icons: [
			{
				src: '/icons/web-app-manifest-192x192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable',
			},
			{
				src: '/icons/web-app-manifest-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable',
			},
		],
	};
}
