import { PAGES } from '@/config/pages.config';
import { pagesMetadata } from '@/config/pagesMetadata.config';
import { env } from '@/env';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = env.NEXT_PUBLIC_CLIENT_URL;

	const staticRoutes: MetadataRoute.Sitemap = Object.values(PAGES).map(
		(route) => {
			const metadata = pagesMetadata[route] ?? {
				lastModified: new Date().toISOString().split('T')[0],
				changeFrequency: 'monthly',
				priority: 0.5,
			};

			return {
				url: `${baseUrl}${route}`,
				...metadata,
			};
		},
	);

	return staticRoutes;
}
