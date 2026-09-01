import { AUTH_PAGES } from '@/config/authPages.config';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { env } from '@/env';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	const baseUrl = env.NEXT_PUBLIC_CLIENT_URL;

	const disallowedRoutes = [
		...Object.values(PRIVATE_PAGES).map((route) => `${route}/*`),
		...Object.values(AUTH_PAGES).map((route) => `${route}/*`),
		'/api/*',
	];

	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: disallowedRoutes,
		},
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
