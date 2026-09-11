import { AUTH_PAGES } from '@/config/authPages.config';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { env } from '@/env';
import { MetadataRoute } from 'next';

const extractBaseRoutes = (obj: Record<string, unknown>): string[] => {
	return Object.values(obj).filter((value) => typeof value === 'string');
};

export default function robots(): MetadataRoute.Robots {
	const baseUrl = env.NEXT_PUBLIC_CLIENT_URL;

	const disallowedRoutes = [
		...extractBaseRoutes(PRIVATE_PAGES).map((route) => `${route}/*`),
		...extractBaseRoutes(AUTH_PAGES).map((route) => `${route}/*`),
		'/api/*',
		'/u/*',
	];

	const uniqueDisallowedRoutes = Array.from(new Set(disallowedRoutes));

	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: uniqueDisallowedRoutes,
		},
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
