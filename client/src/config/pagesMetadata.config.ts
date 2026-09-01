import { MetadataRoute } from 'next';
import { PAGES } from './pages.config';

type PageRoute = (typeof PAGES)[keyof typeof PAGES];

type RouteMetadata = Omit<MetadataRoute.Sitemap[number], 'url'>;

export const pagesMetadata: Partial<Record<PageRoute, RouteMetadata>> = {
	[PAGES.HOME]: {
		changeFrequency: 'monthly',
		priority: 1,
		lastModified: '2026-09-01',
	},
	[PAGES.TERMS_AND_CONDITIONS]: {
		changeFrequency: 'yearly',
		lastModified: '2026-03-31',
		priority: 0.5,
	},
	[PAGES.PRIVACY_POLICY]: {
		changeFrequency: 'yearly',
		lastModified: '2026-09-01',
		priority: 0.5,
	},
	[PAGES.COOKIES]: {
		changeFrequency: 'yearly',
		lastModified: '2026-09-01',
		priority: 0.5,
	},
};
